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
import Order from '../components/Order'

const GetAllMaerker = gql`
  query GetMaerker {
    maerker(orderBy: navn_ASC) {
      id
      navn
      modeller {
        id
        model
        aar
        forBag
        kommentar
        varenummer {
          id
          lager
          varenummer
          pris
        }
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const { maerker } = await graphcmsClient.request(GetAllMaerker)

  return {
    props: {
      maerker,
    }
  }
}

export default function Home({ maerker }) {
  const [data, setData] = useState(maerker)
  const [showOrder, setShowOrder] = useState(false)
  const [filtered, setFiltered ] = useState(data);
  const [cart, setCart] = useContext(CartContext);
  const router = useRouter()

  const tilBestilling = () => {
    router.push('/bestil')
  }

  const handleClick = (event, model) => {
    setCart(model)
    setShowOrder(true)
  }

  console.log(filtered)

  return (
    <>
      <section className={scss.heading}>
        <h1>Bestil plast-inderskærme til din bil her</h1>
        <p>I vores sortiment finder du plast inderskærme til en lang række biler til gode priser. Bestil plast-inderskærme til din bil ved at filtrere i mærkerne herunder, og herefter klikke på varen du ønsker. Ordren er først afgivet, når du har angivet dit navn og email-adresse, og har klikket på knappen &apos;Afgiv bestilling&apos;. Du kan også ringe eller skrive til os.</p>
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
            <div className={scss.overskrift}>Filtrér efter mærke</div>
            <button className={
              `${scss.tag} ${scss.allTag} ${filtered === data ? `${scss.selected}` : ''}`} onClick={() => setFiltered(data)}>Alle
            </button>
            { data.map((tag) => (
              <button key={tag.id} type='button' className={`${scss.tag} ${tag === filtered[0] && filtered != data ? `${scss.selected}` : ''}`} onClick={() => setFiltered([tag])}>
                <span>
                  {tag.navn}
                  <sup style={{ fontSize: '10px' }}>
                    ({tag.modeller.length})
                  </sup>
                </span>
              </button>
            ))}
          </div>
        </div>
        <section className={scss.list}>
          <div className={scss.listInner}>
            { filtered.map(({navn, id, modeller}) =>(
              <div className={scss.models} key={id} >
                <h2>
                  <span>{navn}</span>
                </h2>
                <ul className={scss.row}>
                  { modeller.map((model) => (
                    <li
                      className={scss.model}
                      key={model.id}
                      onClick={event => handleClick(event, model)}
                      >
                      { model.aar &&
                        <div className={scss.year}>
                          Årgang: {model.aar}
                        </div>
                      }
                      { model.varenummer.varenummer &&
                        <div className={scss.sku}>
                          Varenummer: {model.varenummer.varenummer}
                        </div>
                      }
                      {model.kommentar &&
                        <div className={scss.comment}>
                          {model.kommentar}
                        </div>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
            <li>Flad aluminumsplade</li>
            <li>{cart.model}</li>
            <li>{cart.varenummer.varenummer}</li>
            <li>{cart.aar}</li>
            <li>{cart.comment}</li>
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
