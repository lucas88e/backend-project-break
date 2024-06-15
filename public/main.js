import './pruebaFirebase/registerForm.js'

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {auth} from './pruebaFirebase/firebase.js'
import {loginCheck} from './pruebaFirebase/loginCheck.js'
import './pruebaFirebase/registerForm.js'
import './pruebaFirebase/logout.js'
import './pruebaFirebase/loginForm.js'


onAuthStateChanged(auth,async(user)=>{

    if(user)
        loginCheck(user)


})
console.log("hola")