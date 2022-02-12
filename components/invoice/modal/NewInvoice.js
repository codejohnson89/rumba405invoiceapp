import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { database } from '../../firebase/firebase';
import { ref, set } from "firebase/database";

import styles from './invoice.module.css'


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
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>   
                    <h1>New Invoice</h1>
                    <label>Client&quot;s Name</label>
                    <input {...register("clientName", {required: true})} />
                    <label>Client&quot;s Email</label>
                    <input {...register("clientEmail")} />
                    <label>Street Address</label>
                    <input {...register("clientAddress.street")} />
                    <div className={styles.flex}>
                        <div className={styles.city}>
                            <label>City</label>
                            <input {...register("clientAddress.city")} />
                        </div>
                        <div className={styles.state}>
                            <label>State</label>
                            <input {...register("clientAddress.state")} />
                        </div>
                        <div className={styles.country}>
                            <label>Country</label>
                            <input {...register("clientAddress.country")} />
                        </div>   
                    </div>
                    <div className={styles.flex}>
                        <div className={styles.invoiceDate}>
                            <label>Invoice Date</label>
                            <input {...register("createdAt")} />
                        </div>
                        <div className={styles.paymentType}>
                            <label>Payment/Expense</label>
                            <select className={styles.select} {...register("paymentType")} >
                                <option disabled value=""></option>
                                <option value="expense">Expense</option>
                                <option value="payment">Payment</option>
                            </select>
                        </div>
                        <div className={styles.paymentAmount}>
                            <label>Payment</label>
                            <input {...register("paymentAmount")} />
                        </div>
                    </div>
                    <label>Payment Description</label>
                    <textarea {...register("description")} />

                    <input type="submit" className={styles.button} placeholder="Submit"/>
                </form>
                <button onClick={props.closeModal}>Close</button>
            </ReactModal>

        </>
    )
}
