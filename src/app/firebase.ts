// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  updateProfile,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv14a7y9lmOcqsxuFaESeyDZtJPR4RXNE",
  authDomain: "reayia.firebaseapp.com",
  projectId: "reayia",
  storageBucket: "reayia.appspot.com",
  messagingSenderId: "285286731520",
  appId: "1:285286731520:web:aa068e2fc8d7984c9bede5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
auth.languageCode = "ar";
const user: any = auth.currentUser;

export {
  auth,
  app,
  RecaptchaVerifier,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithPhoneNumber,
  user,
};
