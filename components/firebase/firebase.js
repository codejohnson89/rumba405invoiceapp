import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


const key = 'AIzaSyC-80xfQZBZS_2T2ghlKbzOAPa68SaNXtA';

const firebaseConfig = {
    apiKey: key,
    authDomain: "invoice-app-3fa85.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://invoice-app-3fa85-default-rtdb.firebaseio.com",
    projectId: "invoice-app-3fa85",
    storageBucket: "invoice-app-3fa85.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "invoice-app-3fa85"
  };


const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);