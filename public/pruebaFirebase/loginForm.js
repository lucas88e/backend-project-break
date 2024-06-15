import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import {auth} from "./firebase.js"

const loginForm =document.querySelector("#login-form")

loginForm.addEventListener("submit",async (e)=>{
    
    e.preventDefault()
const email = loginForm["login-email"].value
const password = loginForm["login-password"].value
console.log(password,email,auth)



try{
    const credentials = await signInWithEmailAndPassword(auth,email,password)
    console.log(credentials)
    //Cerrar el modal
    const loginModal = document.querySelector("#login")
   const modal = bootstrap.Modal.getInstance(loginModal)
    modal.hide()
    console.log("Enhorabuena")
}
catch(error){

     if(error.code ==="auth/wrong-password"){
        alert("password is incorrect")
    }
 
    else if(error.code ==="auth/user-not-found") {
        alert("Invalid email")
    }
    else {
        alert("error")
    }
}
})