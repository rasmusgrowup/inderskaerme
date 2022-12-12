import Order from '../components/Order'
import scss from '../styles/main.module.scss'
import { useState, useEffect, useRef, useContext } from 'react'

// context
import { CartContext } from '../lib/CartContext';

export default function Bestil() {
    const [cart, setCart] = useContext(CartContext);
    const [price, setPrice] = useState()

    useEffect(() => {
        if (cart != null) {
            let price = 0;
            let i = 0;
            for (i; i < cart.length; i++) {
                price += cart[i].pris;
            }
            setPrice(price);
        } else {
            setPrice(0);
        }
    }, [])
  return (
    <>
      <section className={scss.bestilling}>
        <h1>Du er ved at bestille følgende:</h1>
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
            </ul>
        ))}
          <div className={scss.price}>
              <span>DKK {cart != null ? 60 : 0} i fragt</span>
              <span>DKK {price} ex. moms pr. sæt</span>
          </div>
        <h2>Kontakt- og leveringsoplysninger</h2>
          <Order />
      </section>
    </>
  )
}
