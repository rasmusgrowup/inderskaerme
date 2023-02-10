import Order from '../components/Order'
import scss from '../styles/main.module.scss'
import { useState, useEffect, useRef, useContext } from 'react'

// context
import { CartContext } from '../lib/CartContext';
import {useRouter} from "next/router";
import Link from "next/link";

export default function Bestil() {
    const [cart, setCart] = useContext(CartContext)
    const [price, setPrice] = useState()
    const router = useRouter()

    const removeFromCart = (c) => {
        const newCartData = cart.filter((item) => item !== c)
        setCart(newCartData)
        if (cart.length === 1) {
            router.push("/")
        }
    }

    const tilForsiden = () => {
        router.push('/', undefined, { shallow: true })
    }

    useEffect(() => {
        if (cart != null) {
            let price = 0;
            let i = 0;
            for (i; i < cart.length; i++) {
                price += cart[i].pris;
            }
            setPrice(price);
        }
    }, [cart])

  return (
    <>
      <section className={scss.bestilling}>
          <Link href='/' shallow>tilbage</Link>
        <h1>Din kurv:</h1>
        { cart !== null && cart.map((c, i) => (
            <ul key={i} className={scss.ordreListe}>
                <li>{c.maerke.navn} {c.model}</li>
                <li>Varenummer: {c.varenummer.varenummer}</li>
                <li>Årgang: {c.aar}</li>
                { c.kommentar && <span>OBS: {c.kommentar}</span> }
                <li>For/bag: {c.forBag}</li>
                <li>Type:
                    { c.typer == 'Alu_flad' ? ' Alu. (flad)' :
                        c.typer == 'Plast_flad' ? ' Plast (flad)' :
                            c.typer == 'Plast_stoebt' ? ' Plast (støbt)' :
                                c.typer == 'Anden' ? ' Anden' : c.typer
                    }
                </li>
                <button className={scss.removeBtn} onClick={() => removeFromCart(c)}>Fjern</button>
            </ul>
        ))}
          <div className={scss.price}>
              <span>I din kurv er {cart.length} sæt til i alt DKK {price} ekskl. moms.</span>
              <span>Fragt koster DKK 60,- i Danmark.</span>
          </div>
        <h2>Kontakt- og leveringsoplysninger</h2>
          <Order cartData={cart}/>
      </section>
    </>
  )
}
