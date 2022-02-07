import styles from './invoice.module.css';
import Link from 'next/link';

export default function InvoiceContainer(props) {
    let data = props.data;


    return (
        <>
        <h1>Invoice container</h1>
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
                            <div className="clientPreviewInfo">
                                <div className="orderId">#{client.data.id}</div>
                                <div className="dueDate">{client.data.paymentType}</div>
                                <div className="clientName">{client.data.clientName}</div>
                                <div className="total">${client.data.paymentAmount}</div>
                                <div className="status">{client.data.createdAt}</div>
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
