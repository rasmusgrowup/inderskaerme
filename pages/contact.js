import Image from 'next/image'
import Link from "next/link"
import scss from '../styles/main.module.scss'
import { useContext } from 'react'

// context
import { CartContext } from '../lib/CartContext';

// Components
import MailIcon from '../components/Icons/MailIcon'
import PhoneIcon from '../components/Icons/PhoneIcon'

export default function Contact() {
  const [cart, setCart] = useContext(CartContext);

  return (
    <>
      <section className={scss.heading}>
        <h1>Kontakt os</h1>
        <p>Som du muligvis allerede har hørt fra Ebbe Clemens, AB Plast, så fortsætter TekTrol salget af plast-inderskærme. Vi glæder os til at betjene dig – og vi håber at kunne gøre det på samme gode måde som Ebbe har gjort det.</p>
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
    </>
  )
}
