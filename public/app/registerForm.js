import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"

import {auth} from "./firebase.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const loginForm =document.querySelector("#register-form")

loginForm.addEventListener("submit",async (e)=>{
    
    e.preventDefault()
const email = loginForm["register-email"].value
const password = loginForm["register-password"].value
console.log(password,email,auth)



try{
    const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
    console.log(userCredentials)
    //Cerrar el modal
    const registerModal = document.querySelector("#register")
   const modal = bootstrap.Modal.getInstance(registerModal)
    modal.hide()
}
catch(error){

    if(error.code ==="auth/email-already-in-use"){
        alert("Email already use ")
    }
    else if(error.code ==="auth/invalid-email"){
        alert("Invalid email")
    }
    else if(error.code ==="auth/weak-password"){
        alert("password is too weak choose at least 6 characters")
    }
 
}
})
