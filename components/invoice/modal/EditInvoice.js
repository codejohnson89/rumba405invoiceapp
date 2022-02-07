import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { database } from '../../firebase/firebase';
import { ref, set } from "firebase/database";
import { useRouter } from 'next/router';

import styles from './newinvoice.module.css';
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
            <h1>New Invoice</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>                   
                    <label>Client&quot;s Name</label>
                    <input {...register("clientName")} defaultValue={props.details.data.clientName}/>
                    <label>Client&quot;s Email</label>
                    <input {...register("clientEmail")} defaultValue={props.details.data.clientEmail}/>
                    <label>Street Address</label>
                    <input {...register("clientAddress.street")} defaultValue={props.details.data.clientAddress.street}/>
                    <label>City</label>
                    <input {...register("clientAddress.city")} defaultValue={props.details.data.clientAddress.city}/>
                    <label>Postal Code</label>
                    <input {...register("clientAddress.state")} defaultValue={props.details.data.clientAddress.state}/>
                    <label>Country</label>
                    <input {...register("clientAddress.country")} defaultValue={props.details.data.clientAddress.country}/>
                    <label>Payment/Expense</label>
                    <select {...register("paymentType")} >
                        <option value="expense">Expense</option>
                        <option value="payment">Payment</option>
                    </select>
                    <label>Payment</label>
                    <input {...register("paymentAmount")} />
                    <label>Project Description</label>
                    <input {...register("description")} defaultValue={props.details.data.description}/>                    
                    {/* //Item list goes here */}
                    <input {...register("items")} />

                    <input type="submit" placeholder="Submit"/>
                </form>
                <button onClick={props.closeModal}>Close</button>
            </ReactModal>

        </>
    )
}
