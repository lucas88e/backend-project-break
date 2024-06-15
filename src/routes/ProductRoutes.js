const express = require("express")
const router = express.Router();
const { createProduct, deleteProduct,updateProduct,categorias,dashboardProduct,productsId} = require("../controllers/productController.js")
const multer = require("multer")
const { showNewProducts,showEditProducts,showProducts,dashboard } = require("../controllers/esstructura.js")
const auth = require("../middelware/auth")
const admin = require("../middelware/admin")
const Product = require("../models/Product.js");
require('express-async-errors')
const MIMETYPES = ['image/jpeg', 'image/png'];
const {extname} = require("path")
const upload = multer({     storage: multer.diskStorage({ 
    destination: "public/images/",
    filename:(req,file,cb)=>{
        const fileExtension = extname(file.originalname);
        const fileName = file.originalname.split(fileExtension)[0];

        cb(null,`${fileName}${fileExtension}`)

}
}),
  
    fileFilter:(req,file,cb)=>{
        if(MIMETYPES.includes(file.mimetype))cb(null,true)
            else cb(new Error (`Only ${MIMETYPES.join('')}mimetypes are allowed`))
    },
    limits:{
        fieldSize: 10000000
    }
 })


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
router.get("/products",showProducts)


//GET /products/:productId: Devuelve el detalle de un producto.

router.get("/products/:productId", productsId);
//PUT /dashboard/:productId: Actualiza un producto.


router.put("/dashboard/:productId", updateProduct);

//DELETE /dashboard/:productId/delete: Elimina un producto.

router.delete("/dashboard/:productId/delete", deleteProduct)

///GET /dashboard: Devuelve el dashboard del administrador. 
// En el dashboard aparecerán todos los artículos que se hayan subido. 
// Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.


router.get("/dashboard" , dashboard)
// router.get("/dashboard" ,auth, dashboard)

//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.get("/dashboard/new", showNewProducts)
// router.get("/dashboard/new", [auth,admin],showNewProducts)

//GET /dashboard/:productId: Devue lve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId", dashboardProduct);

//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

router.get("/dashboard/:productId/edit", showEditProducts);




// Rutas AUTH LOGIN REGISTER LOGOUT



module.exports = router


