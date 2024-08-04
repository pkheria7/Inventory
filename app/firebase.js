// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4x8byBapDP-3y35y0IrjK-ioMQ-D_4hk",
  authDomain: "pantryapp-5e4c2.firebaseapp.com",
  projectId: "pantryapp-5e4c2",
  storageBucket: "pantryapp-5e4c2.appspot.com",
  messagingSenderId: "272551744570",
  appId: "1:272551744570:web:843af5f52089d5d29fd103"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export{app,firestore}