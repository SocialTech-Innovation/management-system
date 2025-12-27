import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC6HDtlpV4Akrt7qGxLQlhyc5V1QfMBogo",

  authDomain: "organization-management-a65f7.firebaseapp.com",

  projectId: "organization-management-a65f7",

  storageBucket: "organization-management-a65f7.firebasestorage.app",

  messagingSenderId: "868029595252",

  appId: "1:868029595252:web:b3eb9d55487e88cd665b21",

  measurementId: "G-0E1XF20REN"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;