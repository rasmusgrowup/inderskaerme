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
            <li>Flad aluminumsplade</li>
            <li>{cart.model}</li>
            <li>{cart.varenummer.varenummer}</li>
            <li>{cart.aar}</li>
            <li>{cart.comment}</li>
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
