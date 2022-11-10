import Order from '../components/Order'
import scss from '../styles/main.module.scss'
import { useState, useEffect, useRef, useContext } from 'react'

// context
import { CartContext } from '../lib/CartContext';

export default function Bestil() {
  const [cart, setCart] = useContext(CartContext);
  return (
    <>
      <section className={scss.bestilling}>
        <h1>Du er ved at bestille følgende:</h1>
        { cart !== null
          ? <ul className={scss.ordreListe}>
            <li>{cart.maerke.navn} {cart.model}</li>
            <li>Varenummer: {cart.varenummer.varenummer}</li>
            <li>Årgang: {cart.aar}</li>
            { cart.kommentar && <span>OBS: {cart.kommentar}</span> }
            <li>For/bag: {cart.forBag}</li>
            <li>Type:
              { cart.typer == 'Alu_flad' ? ' Alu. (flad)' :
                cart.typer == 'Plast_flad' ? ' Plast (flad)' :
                cart.typer == 'Plast_stoebt' ? ' Plast (støbt)' :
                cart.typer == 'Anden' ? ' Anden' : cart.typer
              }
            </li>
            <li className={scss.price}>
                <span>DKK 60 i fragt</span>
                { cart.pris && <span>DKK {cart.pris} ex. moms pr. sæt</span>}
            </li>
          </ul>
          :
          <></>
        }
        <h2>Kontakt- og leveringsoplysninger</h2>
        <Order />
      </section>
    </>
  )
}
