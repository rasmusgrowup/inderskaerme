import Head from 'next/head'
import Image from 'next/image'
import scss from '../styles/main.module.scss'
import { useState, useEffect } from 'react'

// GraphCMS
import { graphcmsClient } from '../lib/graphcms';
import { gql } from 'graphql-request';

// Components
import CheckMark from '../components/Icons/CheckMark'
import ArrowRight from '../components/Icons/ArrowRight'

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
  const [filtered, setFiltered ] = useState(data);

  console.log(filtered)

  return (
    <>
      <section className={scss.heading}>
        <h1>Bestil plast-inderskærme til din bil her</h1>
        <p>I vores sortiment finder du plast inderskærme til en lang række biler til gode priser. Bestil plast-inderskærme til din bil ved at filtrere i mærkerne herunder, og herefter tilføje varen til din ordreliste. Alle skærme er bestillingsvarer</p>
      </section>
      <div className={scss.filter}>
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
      <section className={scss.list}>
        <div className={scss.scrollRight}>
          <span>Scroll til højre</span>
          <ArrowRight />
        </div>
        <div className={scss.listInner}>
          { filtered.map(({navn, id, modeller}) =>(
            <div className={scss.models} key={id} >
              <h2>
                <span>{navn}</span>
              </h2>
              <header className={scss.header}>
                <span className={scss.col1}>Model</span>
                <span className={scss.col2}>Årgang</span>
                <span className={scss.col3}>Varenummer</span>
                <span className={scss.col4}>Kommentar</span>
              </header>
              <ul>
                { modeller.map((model) => (
                  model.varenummer.lager === true ? (
                    <li
                      className={scss.model}
                      key={model.id}>
                      <span className={scss.col1}>{model.model}</span>
                      <span className={scss.col2}>{model.aar}</span>
                      <span className={scss.col3}>{model.varenummer.varenummer}</span>
                      <span className={scss.col4}>{model.kommentar}</span>
                    </li>
                  )
                    : null
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
