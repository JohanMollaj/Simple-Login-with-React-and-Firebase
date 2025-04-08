import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBIcksCJTZDwFrDS7m9MYFk_LH_DpMyqP4",
    authDomain: "react-login-app-efcca.firebaseapp.com",
    projectId: "react-login-app-efcca",
    storageBucket: "react-login-app-efcca.firebasestorage.app",
    messagingSenderId: "581031953677",
    appId: "1:581031953677:web:086a6b7ffd117f9a175c44",
    measurementId: "G-M1N4J32CLD"
};

const app = initializeApp(firebaseConfig);

// Get the Auth and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;