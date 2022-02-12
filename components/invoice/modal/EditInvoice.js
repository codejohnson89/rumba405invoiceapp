import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { database } from '../../firebase/firebase';
import { ref, set } from "firebase/database";
import { useRouter } from 'next/router';

import styles from './invoice.module.css';
import { useEffect, useState } from 'react';


ReactModal.setAppElement("#__next")

export default function EditInvoice (props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [formData, setFormData] = useState();
    const router = useRouter();
    const id = router.query.id;
    const dbLink = `https://invoice-app-3fa85-default-rtdb.firebaseio.com/invoices/${id}.json`;


    function onSubmit(data) {
        const db = database;
        data.originalDate = new Date().toUTCString();
        data.id = id;
        set(ref(db, '/invoices/' + id), {
            data: data
        })

        setTimeout(() => {
            window.location.reload(true)
        }, 500)
        
       
        props.closeModal();
    }

    const fectchData = async () => {
        try {
            const res = await fetch(dbLink);
            const json = await res.json();

            setFormData(json)
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <>
            
            <ReactModal isOpen={props.isOpen}>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>                   
                    <h1>Edit Invoice <br/></h1>
                    <spa>#{props.details.data.id}</spa>
                    <label>Client&quot;s Name</label>
                    <input {...register("clientName")} defaultValue={props.details.data.clientName}/>
                    <label>Client&quot;s Email</label>
                    <input {...register("clientEmail")} defaultValue={props.details.data.clientEmail}/>
                    <label>Street Address</label>
                    <input {...register("clientAddress.street")} defaultValue={props.details.data.clientAddress.street}/>
                    <div className={styles.flex}>
                        <div className={styles.city}>
                            <label>City</label>
                            <input {...register("clientAddress.city")} defaultValue={props.details.data.clientAddress.city}/>
                        </div>
                        <div className={styles.state}>
                            <label>State</label>
                            <input {...register("clientAddress.state")} defaultValue={props.details.data.clientAddress.state}/>
                        </div>
                        <div className={styles.country}>
                            <label>Country</label>
                            <input {...register("clientAddress.country")} defaultValue={props.details.data.clientAddress.country}/>
                        </div>
                    </div>
                    <div className={styles.flex}>
                        <div className={styles.invoiceDate}>
                            <label>Invoice Date</label>
                            <input {...register("createdAt")} defaultValue={props.details.data.createdAt} />
                        </div>
                        <div className={styles.paymentType}>
                            <label>Payment/Expense</label>
                            <select {...register("paymentType")} >
                                <option value="expense">Expense</option>
                                <option value="payment">Payment</option>
                            </select>
                        </div>
                        <div className={styles.paymentAmount}>
                            <label>Payment</label>
                            <input {...register("paymentAmount")} defaultValue={props.details.data.paymentAmount}/>
                        </div>
                    </div>
                    <label>Project Description</label>
                    <textarea {...register("description")} defaultValue={props.details.data.description}/>                    


                    <input className={styles.button} type="submit" placeholder="Submit"/>
                </form>
                <button onClick={props.closeModal}>Close</button>
            </ReactModal>

        </>
    )
}
