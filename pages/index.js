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
        maerke {
          navn
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
    const a = 'Alfa Romeo'
    const b = '145'
    const c = a.concat(' ', b)
    console.log(a + ' ' + b)
  }, [])

  console.log(data)

  return (
    <>
      <section className={scss.heading}>
        <h1>Inderskærme</h1>
        <h2>Fra Austin Healey til Aygo X</h2>
        <p>Hér på siden finder du de skærme du søger - og du bestiller med få klik. <br />
         Spørgsmål? Kontakt Claus på mob. 
          <Link href='tel:+4529625995'><a style={{ color: 'var(--red)' }} > 29 62 59 95 </a></Link>
          eller mail
          <Link href='mailto:inderskaerme@tektrol.dk'><a style={{ color: 'var(--red)' }}> inderskaerme@tektrol.dk</a></Link>
        </p>
        <p style={{ opacity: '0.5' }}>
          Kun salg til CVR-nr.<br />
          Ved bestilling før kl. 11:30 sender vi samme dag<br />
          Priser: Flade alu./plast: DKK 750,- pr. sæt. Formstøbte Lokari-skærme: DKK 850 pr. sæt<br />
          Pris er ekskl. fragt og moms. DK-fragt: 60 DKK<br />
        </p>
      </section>
      <section className={scss.shop}>
        <div className={scss.filter}>
          <div className={scss.filterInner}>
            <div className={scss.searchBarContainer} style={{ position: 'relative' }}>
              <input
                className={scss.searchBar}
                type="text"
                placeholder="Søg på mærke eller modelnavn"
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
              <div className={scss.overskrift}>
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
                      { t.name == 'Alu_flad' ? 'Alu. (flad)' :
                        t.name == 'Plast_flad' ? 'Plast (flad)' :
                        t.name == 'Plast_stoebt' ? 'Plast (støbt)' :
                        t.name == 'Anden' ? 'Anden' : t.name
                      }
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
                } else if (
                  val.modeller.some(y => (y.typer.toLowerCase() === type.toLowerCase() || type == "") && (y.maerke.navn.toLowerCase() + ' ' + y.model.toLowerCase()).includes(searchTerm.toLowerCase()))
                ) {
                  return val
                }
              }).map(({navn, id, modeller, maerke}) => (
                <div className={scss.models} key={id} ref={listRef}>
                  <h2>
                    {navn}
                  </h2>
                  <div className={scss.infos}>
                    <div>Model</div>
                    <div>Årgang</div>
                    <div>For / bag</div>
                    <div>Type</div>
                  </div>
                  <div className={scss.row} ref={rowRef}>
                    { modeller.filter((v) => {
                      if (searchTerm == "" && type == "") {
                        return v
                      } else if (
                        (v.typer.toLowerCase() === type.toLowerCase() || type == "") && (v.maerke.navn.toLowerCase() + ' ' + v.model.toLowerCase()).includes(searchTerm.toLowerCase())
                      ) {
                        return v
                      }
                    }).map((model) => (
                      <div
                        className={`${scss.model} model`}
                        key={model.id}
                        onClick={event => addToCart(event, model)}
                        >
                        { model.model &&
                          <div className={scss.name}>
                            {model.maerke.navn} {model.model}
                          </div>
                        }
                        { model.aar &&
                          <div className={scss.year}>
                            {model.aar}
                          </div>
                        }
                        { model.forBag &&
                          <div className={scss.forBag}>
                            {model.forBag}
                          </div>
                        }
                        { model.typer &&
                            <div className={scss.type}>
                              { model.typer == 'Alu_flad' ? 'Alu. (flad)' :
                                  model.typer == 'Plast_flad' ? 'Plast (flad)' :
                                      model.typer == 'Plast_stoebt' ? 'Plast (støbt)' :
                                          model.typer == 'Anden' ? 'Anden' : model.typer
                              }
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
            <li>{cart.maerke.navn} {cart.model}</li>
            <li>Varenummer: {cart.varenummer.varenummer}</li>
            <li>Årgang: {cart.aar}</li>
            <li>Type:
              { cart.typer == 'Alu_flad' ? ' Alu. (flad)' :
                  cart.typer == 'Plast_flad' ? ' Plast (flad)' :
                      cart.typer == 'Plast_stoebt' ? ' Plast (støbt)' :
                          cart.typer == 'Anden' ? ' Anden' : cart.typer
              }
            </li>
            { cart.kommentar && <li>{cart.kommentar}</li>}
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
