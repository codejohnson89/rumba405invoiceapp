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
                                <div className="orderId">#{client.data.orderId}</div>
                                <div className="dueDate">Due {client.data.paymentDue}</div>
                                <div className="clientName">{client.data.clientName}</div>
                                <div className="total">&euro; {client.data.total}</div>
                                <div className="status">{client.data.status}</div>
                                <div>{index}</div>
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
