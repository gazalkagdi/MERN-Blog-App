// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "mernblog-52cea.firebaseapp.com",
    projectId: "mernblog-52cea",
    storageBucket: "mernblog-52cea.appspot.com",
    messagingSenderId: "314533216856",
    appId: "1:314533216856:web:3bfc44a25efef8c997002d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);