import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2ozcE0Wh1h3g88d10zXE3VrZXDQHFEqU",
  authDomain: "pinpad-60b13.firebaseapp.com",
  projectId: "pinpad-60b13",
  storageBucket: "pinpad-60b13.appspot.com",
  messagingSenderId: "409954784910",
  appId: "1:409954784910:web:2fc8923f5bdc18c688dbdf"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
