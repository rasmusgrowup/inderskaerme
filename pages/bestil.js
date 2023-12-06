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
        const itemIndex = cart.findIndex(item => item === c);
        if (itemIndex !== -1) {
            const updatedCart = [...cart];
            if (updatedCart[itemIndex].quantity > 1) {
                // If quantity is greater than 1, reduce it by 1
                updatedCart[itemIndex].quantity -= 1;
            } else {
                // If quantity is 1 or less, remove the item from the cart
                updatedCart.splice(itemIndex, 1);
            }
            setCart(updatedCart);
        }

        if (cart.length === 1) {
            router.push("/");
        }
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
        <h1>Din kurv:</h1>
        { cart && cart.map((c, i) => (
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
              { cart
                  ? <span>I din kurv er {cart.length} sæt til i alt DKK {price} ekskl. moms.</span>
                  : <span>Ingen varer i kurven</span>
              }
              <span>Fragt koster DKK 84,- i Danmark.</span>
          </div>
        <h2>Kontakt- og leveringsoplysninger</h2>
          <Order cartData={cart}/>
      </section>
    </>
  )
}
