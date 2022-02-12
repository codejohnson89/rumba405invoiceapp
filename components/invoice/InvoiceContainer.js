import styles from './invoice.module.css';
import Link from 'next/link';

export default function InvoiceContainer(props) {
    let data = props.data;


    return (
        <>
            <ul className={styles.invoiceList}>
                {data.map((client, index) => {
                    console.log(index)
                    console.log(client)
                    if(client == null) {
                        console.log('empty invoice')
                        return;
                    } else {
                    return <li 
                    key={index}
                    >
                    
                    <Link href={"/detail/" + client.data.id}>
                        <a>
                            <div className={styles.clientPreviewInfo}>
                                <span className={styles.orderId}>#{client.data.id}</span>
                                <span className={styles.status}>{client.data.createdAt}</span>
                                <span className={styles.clientName}>{client.data.clientName}</span>
                                <span className={styles.total}>${client.data.paymentAmount}</span>
                                <span className={styles.paymentType}>{client.data.paymentType}</span>

                            </div>
     
                        </a>
                    </Link>
                    </li>
                    }
                })}
            </ul>
        </>
    )
}
