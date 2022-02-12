import HomeHeader from '../../components/headers/HomeHeader';
import styles from './detail.module.css';
import { useRouter } from 'next/router';


export default function InvoiceDetail(props) {
    // const [detail, setDetail] = useState();
    const router = useRouter();
    const {id} = router.query;

    if (!props.details) {
        return <h1>Loading....</h1>
    }


    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <HomeHeader detail={props.details} id={id} />
                <section className={styles.detailsContainer}>
                    <div className={styles.topSection}>
                        <div className={styles.info}>
                            <p>{props.details.data.id}</p>
                            <p>{props.details.data.description}</p>
                        </div>
                        <div className={styles.address}>
                            <p>
                            {props.details.data.clientAddress.street}<br/>
                            {props.details.data.clientAddress.city}<br/>
                            {props.details.data.clientAddress.state}<br/>
                            {props.details.data.clientAddress.country}
                            </p>
                        </div>
                    </div>
                    
                    <p>${props.details.data.paymentAmount}</p>
                    <p>{props.details.data.createdAt}</p>
                    <p>{props.details.data.paymentDue}</p>
                    <p>{props.details.data.clientName}</p>
                    <p>{props.details.data.clientEmail}</p>
                    {/* <p>{props.details.data.items[0].name}{props.details.data.items[0].quantity}{props.details.data.items[0].price}{props.details.data.items[0].total}</p> */}
                    <p>{props.details.data.total}</p> 
                </section>
            </div>
        </main>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;


    const res = await fetch(`https://invoice-app-3fa85-default-rtdb.firebaseio.com/invoices/${id}.json`);
    const details = await res.json();
    // const detailedData = details.find((detail) => {
    //     detail.id == id;
    // })

    return {
        props: {
            details,
            id
            // detailedData,
        },
    }
}