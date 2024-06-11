// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaAdTY4iCZcHn_0VQqmdjPQchJVIpuSV0",
  authDomain: "projectbreak-back-end.firebaseapp.com",
  projectId: "projectbreak-back-end",
  storageBucket: "projectbreak-back-end.appspot.com",
  messagingSenderId: "818990489765",
  appId: "1:818990489765:web:1846d1902baa7dd3ef6d4c",
  measurementId: "G-ZHEM0TLZ8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
module.exports = {app,analytics}