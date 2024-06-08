const express = require("express")
const router = express.Router();
const { createProduct,register, showEditProduct, deleteProduct, updateProduct, dashboardProduct, } = require("../controllers/productController.js")
const multer = require("multer")
const upload = multer({ dest: "public/images/" })
const { showProductss,showNewProductss,showEditProductss,dashboardProducts,productsId,dashboard } = require("../controllers/esstructura.js")
const usersDB = {}
const bcrypt = require("bcrypt")
const auth = require("../middelware/auth")
const  getNavBar  = require("../controllers/esstructura.js");

const jwt = require('jsonwebtoken')
async function generateJWT(payload) {
	return await jwt.sign(payload, 'cocacola')
}




// POST /dashboard: Crea un nuevo producto.
// router.get("/", showProducts)
router.post("/dashboard", upload.single("imagen"), createProduct)
//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get("/products", showProductss)

//GET /products/:productId: Devuelve el detalle de un producto.

router.get("/products/:productId", productsId);
//PUT /dashboard/:productId: Actualiza un producto.

router.put("/dashboard/:productId", updateProduct);

//DELETE /dashboard/:productId/delete: Elimina un producto.

router.delete("/dashboard/:productId/delete", deleteProduct)

///GET /dashboard: Devuelve el dashboard del administrador. 
// En el dashboard aparecerán todos los artículos que se hayan subido. 
// Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.


router.get("/dashboard", dashboard)

//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.get("/dashboard/new", showNewProductss)
//GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId", dashboardProducts);

//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

router.get("/dashboard/:productId/edit", showEditProductss);




// Rutas AUTH LOGIN REGISTER LOGOUT


router.post("/login", async (req, res) => {
    const { username, password: passwordPlainText } = req.body
    if (!usersDB[username])
        return res.status(400).send("Usuario o contraseña no valido")
    const isAuth = await bcrypt.compare(passwordPlainText,
        usersDB[username].password)
    if (!isAuth)
        return res.status(400).send("Usuario o contraseña no valido")

    const token = await generateJWT({ username })

	res.setHeader('x-auth-token', token)
    res.redirect("/products")
}

)
router.get("/registro",register)

router.post("/register", async (req, res) => {

    const { username, password: passwordPlainText } = req.body;
    if (usersDB[username])
        return res.status(400).send("Usuario o contraseña no válido")
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(passwordPlainText, salt)
    usersDB[username] = { username, password }
    const token = await generateJWT({ username })

	res.setHeader('x-auth-token', token)
    console.log(usersDB)
    res.redirect("/sesion")
})



module.exports = router


