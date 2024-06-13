import './app/registerForm.js'

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {auth} from './app/firebase.js'
import {loginCheck} from './app/loginCheck.js'
import './app/registerForm.js'
import './app/logout.js'
import './app/loginForm.js'


onAuthStateChanged(auth,async(user)=>{

    if(user)
        loginCheck(user)


})
console.log("hola")