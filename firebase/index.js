import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc,getDocs,doc, updateDoc,deleteDoc   } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpn63XcHbIBD7kdJdhVqH3QXTx4V6dUB4",
  authDomain: "shopping-app-yt-c6dbc.firebaseapp.com",
  projectId: "shopping-app-yt-c6dbc",
  storageBucket: "shopping-app-yt-c6dbc.appspot.com",
  messagingSenderId: "361858238886",
  appId: "1:361858238886:web:0586530f300ea182bf2767",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, addDoc, getFirestore,getDocs,doc, updateDoc,deleteDoc   };
