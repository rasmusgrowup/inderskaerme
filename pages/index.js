import Image from 'next/image'
import Link from "next/link"
import { useRouter } from 'next/router'
import scss from '../styles/main.module.scss'
import { useState, useEffect, useRef, useContext } from 'react'

// GraphCMS
import { graphcmsClient } from '../lib/graphcms';
import { gql } from 'graphql-request';

// context
import { CartContext } from '../lib/CartContext';

// Components
import CheckMark from '../components/Icons/CheckMark'
import ArrowRight from '../components/Icons/ArrowRight'
import MailIcon from '../components/Icons/MailIcon'
import PhoneIcon from '../components/Icons/PhoneIcon'
import CloseIcon from '../components/Icons/CloseIcon'
import SearchIcon from '../components/Icons/SearchIcon'
import FilterIcon from '../components/Icons/FilterIcon'
import Order from '../components/Order'

const GetAll = gql`
  query GetMaerker {
    maerker(orderBy: navn_ASC) {
      id
      navn
      modeller(orderBy: model_ASC) {
        id
        model
        aar
        forBag
        type
        typer
        kommentar
        varenummer {
          id
          lager
          varenummer
          pris
        }
      }
    }
    modeller(orderBy: model_ASC) {
      model
    }
    __type(name: "Typer") {
      enumValues {
        name
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const { maerker, modeller, __type } = await graphcmsClient.request(GetAll)

  return {
    props: {
      maerker,
      modeller,
      __type,
    }
  }
}

export default function Home({ maerker, modeller, __type }) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(maerker);
  const [filtered, setFiltered] = useState(data);
  const [models, setModels] = useState(modeller);
  const [searchTerm, setSearchTerm] =useState("");
  const [showOrder, setShowOrder] = useState(false);
  const [cart, setCart] = useContext(CartContext);
  const [dropdown, setDropdown] = useState(false);
  const [isTypesNull, setIsTypesNull] = useState(false);
  const [type, setType] = useState("");
  const router = useRouter();
  const listRef = useRef(null);
  const rowRef = useRef(null);

  const tilBestilling = () => {
    router.push('/bestil')
  }

  const addToCart = (event, model) => {
    setCart(model)
    setShowOrder(true)
  }

  const handleDropdown = () => {
    setDropdown(!dropdown)
  }

  useEffect(() => {
    setLoaded(true)
  }, [])

  console.log(type)

  return (
    <>
      <section className={scss.heading}>
        <h1>Bestil plast-inderskærme til din bil her</h1>
        <p>I vores sortiment finder du plast inderskærme til en lang række biler til gode priser. Bestil fra listen herunder. Du kan også ringe eller skrive til os.</p>
        <div className={scss.contactInfo}>
          <Link href='tel:+4529625995'>
            <a>
              <span>Ring til os</span>
              <PhoneIcon />
            </a>
          </Link>
          <Link href='mailto:inderskaerme@tektrol.dk'>
            <a>
              <span>Skriv os en mail</span>
              <MailIcon />
            </a>
          </Link>
        </div>
      </section>
      <section className={scss.shop}>
        <div className={scss.filter}>
          <div className={scss.filterInner}>
            <div className={scss.searchBarContainer} style={{ position: 'relative' }}>
              <input
                className={scss.searchBar}
                type="text"
                placeholder="Søg efter modelnavn"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <i className={scss.searchIcon}><SearchIcon /></i>
            </div>
            <div className={scss.filterContainer}>
              <div className={scss.overskrift} onClick={handleDropdown}>
                Filtrér efter mærke ({data.length})
              </div>
              <i className={scss.filterIcon}><FilterIcon /></i>
              <div className={ dropdown ? `${scss.openDropdown}` : `${scss.closeDropdown}`}>
                <button className={
                  `${scss.tag} ${scss.allTag} ${filtered === data ? `${scss.selected}` : ''}`} onClick={() => setFiltered(data)}>
                  <span>
                    Alle
                  </span>
                </button>
                { data.map((tag) => (
                  <button key={tag.id} type='button' className={`${scss.tag} ${tag === filtered[0] && filtered != data ? `${scss.selected}` : ''}`} onClick={() => setFiltered([tag])}>
                    <span>
                      {tag.navn}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className={scss.filterContainer} >
              <div className={scss.overskrift} onClick={handleDropdown}>
                Filtrér efter type
              </div>
              <i className={scss.filterIcon}><FilterIcon /></i>
              <div className={scss.openDropdown}>
                <button className={
                  `${scss.tag} ${scss.allTag} ${type === "" ? `${scss.selected}` : ''}`} onClick={() => setType("")}>
                  <span>
                    Alle
                  </span>
                </button>
                { __type.enumValues.map((t, i) => (
                  <button key={i} className={
                  `${scss.tag} ${scss.allTag} ${type === t.name ? `${scss.selected}` : ''}`} onClick={() => setType(t.name)}>
                    <span>
                      {t.name}
                    </span>
                  </button>
                ))}
      
              </div>
            </div>
          </div>
        </div>
        <section className={scss.list}>
          { loaded
            ? <div className={scss.listInner}>
              { filtered.filter((val) => {
                if (searchTerm == "" && type == "") {
                  return val
                } else if (val.modeller.some(v =>
                  (v.typer.toLowerCase() === type.toLowerCase() || type == "") && v.model.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                ) {
                  return val
                }
              }).map(({navn, id, modeller}) => (
                <div className={scss.models} key={id} ref={listRef}>
                  <h2>
                    {navn}
                  </h2>
                  <div className={scss.row} ref={rowRef}>
                    { modeller.filter((val) => {
                      if (searchTerm == "" && type == "") {
                        return val
                      } else if (
                        (val.typer.toLowerCase() == type.toLowerCase() || type == "") && val.model.toLowerCase().includes(searchTerm.toLowerCase())
                      ) {
                        return val
                      }
                    }).map((model) => (
                      <div
                        className={`${scss.model} model`}
                        key={model.id}
                        onClick={event => addToCart(event, model)}
                        >
                        { model.model &&
                          <div className={scss.name}>
                            {model.model}
                          </div>
                        }
                        { model.aar &&
                          <div className={scss.year}>
                            Årgang: {model.aar}
                          </div>
                        }
                        { model.forBag &&
                          <div className={scss.forBag}>
                            For/bag: {model.forBag}
                          </div>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            : <><div>Indlæser modeller</div></>
          }
        </section>
      </section>
      <div className={`
        ${scss.order}
        ${ showOrder === true
          ? `${scss.showOrder}`
          : `${scss.hideOrder}
          `}
        `}>
        <p>Du er ved at bestille:</p>
        { cart !== null
          ? <ul className={scss.ordreListe}>
            <li>{cart.model}</li>
            { cart.type && <li>Type: {cart.type}</li>}
            <li>Varenummer: {cart.varenummer.varenummer}</li>
            <li>Årgang: {cart.aar}</li>
          </ul>
          :
          <></>
        }
        <button className={scss.videre} onClick={tilBestilling}>
          Gå til bestillingssiden
        </button>
        <button
        className={scss.anuller}
        onClick={() => setShowOrder(false)}>
          Anullér
        </button>
      </div>
    </>
  )
}
