import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { database } from '../../firebase/firebase';
import { ref, set } from "firebase/database";
import { useRouter } from 'next/router';

import styles from './newinvoice.module.css'
import { useEffect, useState } from 'react';

ReactModal.setAppElement("#react-modals")

export default function EditInvoice(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [formData, setFormData] = useState();
    const { isOpen, closeModal, detail } = props;
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


    // function onSubmit(data) {
    //     console.log(data)
    // }

    useEffect(() => {
        // fectchData();
        console.log(formData)
    })

    const fectchData = async () => {
        try {
            const res = await fetch(dbLink);
            const json = await res.json();

            setFormData(json)
        } catch (error) {
            console.log(error)
        }
    }

    if (!formData) {
        console.log('not working')
        return <p>Loading....</p>
    }



    return (
        <>
            <ReactModal isOpen={true} portalClassName="editInvoiceModal" parentSelector={() => document.querySelector('#react-modals')}>
            <h1>Edit Invoice </h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <label>Street Address</label>
                    <input {...register("senderAddress.street")} defaultValue={detail.senderAddress.street}/>
                 {/*    <label>City</label>
                    <input {...register("senderAddress.city")} defaultValue={formData.senderAddress.city}/>
                    <label>Postal Code</label>
                    <input {...register("senderAddress.postCode")} defaultValue={formData.senderAddress.postCode}/>
                    <label>Country</label>
                    <input {...register("senderAddress.country")} defaultValue={formData.senderAddress.country}/>                    
                    <label>Client&quot;s Name</label>
                    <input {...register("clientName")} defaultValue={formData.clientName}/>
                    <label>Client&quot;s Email</label>
                    <input {...register("clientEmail")} defaultValue={formData.clientEmail}/>
                    <label>Street Address</label>
                    <input {...register("clientAddress.street")} defaultValue={formData.clientAddress.street}/>
                    <label>City</label>
                    <input {...register("clientAddress.city")} defaultValue={formData.clientAddress.city}/>
                    <label>Postal Code</label>
                    <input {...register("clientAddress.postCode")} defaultValue={formData.clientAddress.postCode}/>
                    <label>Country</label>
                    <input {...register("clientAddress.country")} defaultValue={formData.clientAddress.country}/>
                    <label>Invoice Date</label>
                    <input {...register("createdAt")} defaultValue={formData.createdAt}/>
                    <label>Payment Terms</label>
                    <input {...register("paymentTerms")} defaultValue={formData.paymentTerms}/>
                    <label>Project Description</label>
                    <input {...register("description")} defaultValue={formData.description}/>                    
                    {/* //Item list goes here */}

                    <input type="submit" placeholder="Submit"/>
                 </form> 
                <button onClick={closeModal}>Close</button>
            </ReactModal>

        </>
    )
}