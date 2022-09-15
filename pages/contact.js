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
        <p>
          Spørgsmål? Kontakt Claus på mob. 
          <Link href='tel:+4529625995'><a style={{ color: 'blue' }} > 29 62 59 95 </a></Link>
          eller mail
          <Link href='mailto:inderskaerme@tektrol.dk'><a style={{ color: 'blue' }}> inderskaerme@tektrol.dk</a></Link>
        </p>
      </section>
    </>
  )
}
