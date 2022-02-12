import styles from './homeheader.module.css';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import NewInvoice from '../invoice/modal/NewInvoice';
import Link from 'next/link';


import { getDatabase, ref, remove } from "firebase/database";
import { database } from '../firebase/firebase';
import EditInvoice from '../invoice/modal/EditInvoice';





export default function HomeHeader(props) {
    const [newInvoiceModalIsOpen, setNewInvoiceOpen] = useState(false);
    const [editInvoiceModalIsOpen, setEditInvoiceOpen] = useState(false);
    const router = useRouter();
    const pathName = router.pathname;
    const { data, count, id, detail, width } = props;


    function openNewInvoiceModalHandler() {
        setNewInvoiceOpen(true)
    }

    function closeNewInvoiceModalHandler() {
        setNewInvoiceOpen(false)
    }
    function openEditInvoiceModalHandler() {
        setEditInvoiceOpen(true)
    }

    function closeEditInvoiceModalHandler() {
        console.log(data)
        setEditInvoiceOpen(false)
    }

    function deleteInvoiceHandler() {
        console.log('delete')
        console.log(id)
        const db = database;
        remove(ref(db, '/invoices/' + id))
        window.location.pathname = '/'
    }

    useEffect(() => {
        console.log(props.width)
    })


    if (pathName === '/detail/[id]') {
        return (
            <>
                <div className={styles.headerwrapper}>
                    <Link href="/">
                        <a>Go back</a>
                    </Link>
                    {/* <p>{detail.data.status}</p> */}
                    <div>
                        <button onClick={openEditInvoiceModalHandler}>Edit</button>
                        <button onClick={deleteInvoiceHandler}>Delete</button>
                    </div>
                </div>
                <EditInvoice isOpen={editInvoiceModalIsOpen} closeModal={closeEditInvoiceModalHandler} details={detail}/>
            </>
            )
    }



    return (
        <div className={styles.headerwrapper}>
            <div className={styles.leftside}>
                <h1 className={styles.header}>Invoices</h1>
                {
                    width > 426 ?  <p className={styles.text}>There are {count} total invoices</p> : <p className={styles.text}> {count} invoices</p>
                }
                
            </div>            
            <div className="right-side">
                <select className={styles.filter} id="filter" placeholder="Filter by status">
                    <option className="option" value="">FILTER BY STATUS</option>
                    <option className="option" value="PAYMENT">Payment</option>
                    <option className="option" value="EXPENSE">Expense</option>
                </select>
                <button className={styles.button} onClick={openNewInvoiceModalHandler}>New <span className={styles.invoiceText}>Invoice</span></button>
            </div>
            <NewInvoice isOpen={newInvoiceModalIsOpen} closeModal={closeNewInvoiceModalHandler} count={count}/>
        </div>
    )
}

