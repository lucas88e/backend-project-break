 
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
 
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
const auth = getAuth(app);
export {app,auth}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 // // Import the functions you need from the SDKs you need
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  // // Your web app's Firebase configuration
  // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCaAdTY4iCZcHn_0VQqmdjPQchJVIpuSV0",
  //   authDomain: "projectbreak-back-end.firebaseapp.com",
  //   projectId: "projectbreak-back-end",
  //   storageBucket: "projectbreak-back-end.appspot.com",
  //   messagingSenderId: "818990489765",
  //   appId: "1:818990489765:web:1846d1902baa7dd3ef6d4c",
  //   measurementId: "G-ZHEM0TLZ8J"
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // export { app, analytics };
