import HomeHeader from '../components/headers/HomeHeader';
import InvoiceContainer from '../components/invoice/InvoiceContainer'
import styles from '../styles/Home.module.css'
import { GetAllInvoices } from '../utils/fetchData';

export default function Home(props) {
  const {data} = props;
  const count = data.length;
  
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.invoiceContainer}>
            <HomeHeader count={count} data={data}/>
            <InvoiceContainer data={data}/> 
          </section>
        </div>
      </main>
    </>
  )
}


export async function getStaticProps() {
  const data = await GetAllInvoices();

  return {
    props: {
      data
    }
  }
}

