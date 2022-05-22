import scss from '../styles/layout.module.scss'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={scss.main}>{children}</main>
      <Footer />
    </>
  )
}
