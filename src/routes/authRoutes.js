const express = require("express")
const router = express.Router();
// const users= require("../Usuarios/data.js")
// const usersDB  ={}
// const bcrypt = require("bcrypt")

router.get("/sesion", (req, res) => {
    
    if(req.session.token){  res.send(`<form action="/logout" method ="post">
 <h2>Sesion iniciada </h2>
 <button type="submit"> Cerrar sesion</button>
 <p><a href ="/dashboard"> Dashboard</a></p>`)}

 else{
     let login = `<h1> Introduzca su usuario y contraseña</h1><form action="/login" method = "post">
 
<label for="username"> Usuario: </label>
<input type="text" id="username" name="username" required><br>
<label for="password">Contaseña</label>
<input type="password" id="password" name="password" required><br>
<p><button type="submit">Iniciar sesión</button></p>
<button><a href="/registro">Registrarse</a></button>
<button><a href="/products">Atras</a></button>

</form> `
res.send(login)}
})

// router.post("/login",(req,res)=>{
//     const {username,password}= req.body
//     const user = users.find((user)=> user.username ===username && user.password ===password) //Find siempre determina true o false
//     if(user){
//         const token = middelware.generateToken(user)
//         req.session.token = token
//         res.redirect("/dashboard")
//     }else{
//         res.status(401).json({mensaje:"No se ha encontrado el token"})
//     }
   

// })



// router.get("/login")

// router.post("/register",async(req,res)=>{
//     const {username,password:passwordPlainText} = req.body;
//     if(!usersDB[username])
// return res.status(400).send("Usuario o contraseña no válido")
//     const isAuth = await bcrypt.compare(passwordPlainText, usersDB[username.password])
//     if(!isAuth)
//         return res.status(400).send("Usuario o contraseña no válido")

//     res.send("BRAVO")
// })

// router.post('/hola', (req, res) => {
//     console.log('Parsed Body:',req.body); // Debería mostrar el cuerpo de la solicitud analizado
//     res.send('Gracias');
// });


// router.get("/logout")

module.exports = router