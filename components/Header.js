import Image from "next/image"
import Link from "next/link"
import scss from '../styles/layout.module.scss'

// Assets
import Logo from '../public/logo.png'
import CartIcon from '../components/Icons/CartIcon'

export default function Header() {
  return (
    <>
      <header className={scss.header}>
        <div className={scss.logo}>
          <Link href='https://tektrol.dk'><a target='_blank'><Image src={Logo} /></a></Link>
        </div>
        <nav className={scss.nav}>
          <Link href='/'><a className={scss.active}>Inderskærme</a></Link>
          <Link href='/'><a>Kontakt os</a></Link>
        </nav>
        <div className={scss.cart}>
          <span>Din ordre</span>
          <CartIcon />
        </div>
      </header>
    </>
  )
}
