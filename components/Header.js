import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import scss from '../styles/layout.module.scss'

// Assets
import Logo from '../public/logo.png'
import CartIcon from '../components/Icons/CartIcon'

export default function Header() {
  const router = useRouter()

  return (
    <>
      <header className={scss.header}>
        <div className={scss.logo}>
          <Link href='https://tektrol.dk'><a target='_blank' style={{ display: 'flex' }}><Image src={Logo} /></a></Link>
        </div>
        <nav className={scss.nav}>
            <Link href={"/"}>
                <a className={ router.pathname === '/' ? `${scss.active}` : ''}>Produkter</a>
            </Link>
        </nav>
      </header>
    </>
  )
}
