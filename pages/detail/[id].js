import HomeHeader from '../../components/headers/HomeHeader';
import styles from './detail.module.css';
import { useRouter } from 'next/router';


export default function InvoiceDetail(props) {
    // const [detail, setDetail] = useState();
    const router = useRouter();
    const {id} = router.query;


    // useEffect(() => {

    //     console.log(id)
    //     fetch(`https://invoice-app-3fa85-default-rtdb.firebaseio.com/invoices/${id}.json`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             // let dataArr = Object.values(data)
    //             // console.log(dataArr)
    //             setDetail(data)
    //         })

    // }, [id])

    if (!props.details) {
        return <h1>Loading....</h1>
    }


    return (
        <>
            <HomeHeader detail={props.details} id={id} />
            <section className={styles.detailsContainer}>
                <p>${props.details.data.orderId}</p>
                 <p>{props.details.data.description}</p>
                <p>{props.details.data.senderAddress.street}<br/>{props.details.data.senderAddress.city}<br/>{props.details.data.senderAddress.postCode}<br/>{props.details.data.senderAddress.country}</p>
                <p>{props.details.data.createdAt}</p>
                <p>{props.details.data.paymentDue}</p>
                <p>{props.details.data.clientName}</p>
                <p>{props.details.data.clientAddress.street}<br/>{props.details.data.clientAddress.city}<br/>{props.details.data.clientAddress.postCode}<br/>{props.details.data.clientAddress.country}</p>
                <p>{props.details.data.clientEmail}</p>
                {/* <p>{props.details.data.items[0].name}{props.details.data.items[0].quantity}{props.details.data.items[0].price}{props.details.data.items[0].total}</p> */}
                <p>{props.details.data.total}</p> 
            </section>
        </>
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

// export async function getStaticPaths() {
//     const data =  await fetch(`https://invoice-app-3fa85-default-rtdb.firebaseio.com/invoices.json`);
//     const dataArr = Object.values(data)
//     const dataId = dataArr.map(content => ({ params: { id: content.id}}))
//     return {
//         paths: [],
//         fallback: 'blocking'
//     }
// }