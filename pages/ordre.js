import Order from '../components/Order'
import scss from '../styles/main.module.scss'
import { useState, useEffect, useRef, useContext } from 'react'

// context
import { CartContext } from '../lib/CartContext';

export default function Ordre() {
    const [cart, setCart] = useContext(CartContext);

    return (
        <section className={scss.bestilling}>
            <h1>Ordrebekræftelse</h1>
            { cart.map((cart, i) => (
                <ul key={i} className={scss.ordreListe}>
                    <li>{cart.maerke.navn} {cart.model}</li>
                    <li>Varenummer: {cart.varenummer.varenummer}</li>
                    <li>Årgang: {cart.aar}</li>
                    { cart.kommentar && <span>OBS: {cart.kommentar}</span> }
                    <li>For/bag: {cart.forBag}</li>
                    <li>Type:
                        {   cart.typer == 'Alu_flad' ? ' Alu. (flad)' :
                            cart.typer == 'Plast_flad' ? ' Plast (flad)' :
                            cart.typer == 'Plast_stoebt' ? ' Plast (støbt)' :
                            cart.typer == 'Anden' ? ' Anden' :
                            cart.typer
                        }
                    </li>
                </ul>
            ))}
            <p>Vi afsender varen senest i morgen, med mindre du hører andet fra os.</p>
        </section>
    )
}