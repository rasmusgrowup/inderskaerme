import '../styles/globals.css'
import Layout from '../components/Layout'
import { CartProvider } from '../lib/CartContext';
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Head>
          <meta name="description" content="Vi har et stort udvalg af flade eller støbte plast og alu inderskærme af høj kvalitet, og til billige priser. Find inderskærme til din bil her. God service og hurtig levering." key='description'/>
          <meta name="og:title" content="Inderskærme af høj kvalitet | I Alu eller plast | Billige priser" key='title'/>
          <title>Inderskærme af høj kvalitet | I Alu eller plast | Billige priser</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}

export default MyApp
