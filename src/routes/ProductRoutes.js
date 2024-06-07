const express = require("express")
const router = express.Router();
const { createProduct, showProductss,showNewProduct,showEditProduct,deleteProduct,updateProduct,dashboardProduct,dashboard,productsId} = require("../controllers/productController.js")
const multer = require("multer")
const upload = multer({ dest: "public/images/" })
const { showProducts}= require("../controllers/esstructura.js")

// POST /dashboard: Crea un nuevo producto.
router.get("/",showProducts)
router.post("/dashboard", upload.single("imagen"),createProduct)
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


router.get("/dashboard",dashboard)

//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.get("/dashboard/new",showNewProduct)
//GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId",dashboardProduct );

//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

router.get("/dashboard/:productId/edit",showEditProduct);

module.exports = router