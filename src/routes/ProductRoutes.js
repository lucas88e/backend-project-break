const express = require("express")
const router = express.Router();
const { createProduct, deleteProduct,updateProduct,categorias} = require("../controllers/productController.js")
const multer = require("multer")
const upload = multer({ dest: "public/images/" })
const { showNewProducts,showZapatos,showEditProducts,categori,getnav,showCamiseta,dashboardProducts,showProducts,productsId,dashboard } = require("../controllers/esstructura.js")
const auth = require("../middelware/auth")
const admin = require("../middelware/admin")
const Product = require("../models/Product.js");
require('express-async-errors')


// async function generateJWT() {
// 	return await jwt.sign( process.env.jwtPrivateKey)
// }

// router.post("/ee", async (req, res) => {
//     console.log(req.body)
//     res.send("fe")
// })
router.get("/productos/:categorias",categorias)


// POST /dashboard: Crea un nuevo producto.
// router.get("/", showProducts)
router.post("/dashboard", upload.single("imagen"), createProduct)
//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get("/products", auth,showProducts)


//GET /products/:productId: Devuelve el detalle de un producto.

router.get("/products/:productId", productsId);
//PUT /dashboard/:productId: Actualiza un producto.
router.get("/camisetas",showCamiseta)
router.get("/zapatos",showZapatos)

router.put("/dashboard/:productId", updateProduct);

//DELETE /dashboard/:productId/delete: Elimina un producto.

router.delete("/dashboard/:productId/delete", deleteProduct)

///GET /dashboard: Devuelve el dashboard del administrador. 
// En el dashboard aparecerán todos los artículos que se hayan subido. 
// Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.


router.get("/dashboard",auth, dashboard)

//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.get("/dashboard/new", showNewProducts)
//GET /dashboard/:productId: Devue lve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId", dashboardProducts);

//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

router.get("/dashboard/:productId/edit", showEditProducts);




// Rutas AUTH LOGIN REGISTER LOGOUT



module.exports = router


