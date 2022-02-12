import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss';

import Head from 'next/head'
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Rumba 405 Invoices</title>
          <meta name="description" content="Rumba 405 invoices app" />
          <link rel="icon" href="/favicon.ico" />       
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>

  )
}

export default MyApp