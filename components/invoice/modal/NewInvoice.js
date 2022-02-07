import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { database } from '../../firebase/firebase';
import { ref, set } from "firebase/database";

import styles from './newinvoice.module.css'


ReactModal.setAppElement("#__next")

export default function NewInvoice (props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    function onSubmit(data) {
        const randGen = Math.floor(Math.random() * 9999999);
        data.originalDate = new Date().toUTCString();
        data.id = randGen;
        
        const db = database;
        set(ref(db, '/invoices/' + randGen), {
            data: data
        })

        setTimeout(() => {
            window.location.reload(true)
        }, 500)
        
       
        props.closeModal();
    }


    return (
        <>
            
            <ReactModal isOpen={props.isOpen}>
            <h1>New Invoice</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>                   
                    <label>Client&quot;s Name</label>
                    <input {...register("clientName", {required: true})} />
                    <label>Client&quot;s Email</label>
                    <input {...register("clientEmail")} />
                    <label>Street Address</label>
                    <input {...register("clientAddress.street")} />
                    <label>City</label>
                    <input {...register("clientAddress.city")} />
                    <label>State</label>
                    <input {...register("clientAddress.state")} />
                    <label>Country</label>
                    <input {...register("clientAddress.country")} />
                    <label>Invoice Date</label>
                    <input {...register("createdAt")} />
                    <label>Payment/Expense</label>
                    <select {...register("paymentType")} >
                        <option disabled value=""></option>
                        <option value="expense">Expense</option>
                        <option value="payment">Payment</option>
                    </select>
                    <label>Payment</label>
                    <input {...register("paymentAmount")} />
                    <label>Payment Description</label>
                    <input {...register("description")} />

                    <input type="submit" placeholder="Submit"/>
                </form>
                <button onClick={props.closeModal}>Close</button>
            </ReactModal>

        </>
    )
}
