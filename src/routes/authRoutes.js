const express = require("express")
const router = express.Router();
// const users= require("../Usuarios/data.js")
const usersDB  ={}
// const bcrypt = require("bcrypt")
const {register} = require("../controllers/productController")
const auth = require("../middelware/auth")
const User= require("../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


// router.post("/ee", async (req, res) => {
//     console.log(req.body)
//     res.send("fe")
// })


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

router.post(
	'/login',

	async (req, res) => {
		const { username, password: passwordPlainText } = req.body

		const user = await User.findOne({ username })

		if (!user)
			return res.status(400).send('Usuario o contraseña invalido')

		const isAuth = await bcrypt.compare(
			passwordPlainText,
			user.password
		)

		if (!isAuth)
			return res.status(400).send('Usuario o contraseña invalido')
        const token = user.generateJWT()
		req.session.token = token


		// const token = await user.generateJWT()

		res.setHeader('x-auth-token', token)
		res.send('Bravo')
	}
)
router.get("/registro",register)
           
router.post(
	'/register',
	async (req, res) => {
		const {
			username,
			password: passwordPlainText,
			isAdmin,
			...rest
		} = req.body

		const user = await User.findOne({ username })

		if (user)
			return res.status(400).send('Usuario o contraseña invalido')

		const salt = await bcrypt.genSalt(10)
		const password = await bcrypt.hash(passwordPlainText, salt)

		const newUser = await User.create({ username, password, ...rest })

		const token = newUser.generateJWT()
        console.log(token)

		res.setHeader('x-auth-token', token)

		res.send("Registrado")
	}
)
router.get('/profile', auth, (req, res) => {
	console.log(req.user)

	res.send('BRAVOOO')
})
router.post("/logout",(req,res)=>{
	req.session.destroy();
	res.send("Sesion destruida")
	
	})




module.exports = router

// router.post("/login", async (req, res) => {
//     const { username, password: passwordPlainText } = req.body
//     if (!usersDB[username])
//         return res.status(400).send("Usuario o contraseña no valido")
//     const isAuth = await bcrypt.compare(passwordPlainText,
//         usersDB[username].password)
//     if (!isAuth)
//         return res.status(400).send("Usuario o contraseña no valido")

//     const token = await generateJWT({ username })

// 	res.setHeader('x-auth-token', token)
//     res.send("Bravo")
// }

// )
// router.get("/registro",register)

// router.post("/register", async (req, res) => {

//     const { username, password: passwordPlainText } = req.body;
//     if (usersDB[username])
//         return res.status(400).send("Usuario o contraseña no válido")
//     const salt = await bcrypt.genSalt(10)
//     const password = await bcrypt.hash(passwordPlainText, salt)
//     usersDB[username] = { username, password }
//     const token = await generateJWT({ username })

// 	res.setHeader('x-auth-token', token)
//     console.log(usersDB)
//     res.send(`<h1>Registrado con éxito</h1><p>
//         <a href ="/sesion">Login</a></p> `)
// })
