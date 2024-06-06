const express = require("express")
const router = express.Router();
const Product = require("../models/Product.js")
const { createProduct, showProducts } = require("../controllers/productController.js")
// const producto = [{nombre:"Yes",descripcion:"Vamos", Categoria:"Zapatos",Talla:"S",Precio:"5"}]
const multer = require("multer")
const upload = multer({ dest: "public/images/" })

// POST /dashboard: Crea un nuevo producto.

router.post("/dashboard", upload.single("imagen"),createProduct)
    

//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.

// router.get("/products",showProducts)

router.get("/products", showProducts)

//GET /products/:productId: Devuelve el detalle de un producto.

router.get("/products/:productId", async (req, res) => {
    try {
        const prodcutId = await Product.findById(req.params.productId);
        if (!prodcutId) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(prodcutId);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get the post" });
    }
});
//PUT /dashboard/:productId: Actualiza un producto.

router.put("/dashboards/:productId", async (req, res) => {
    try {
        const putProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!putProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(putProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the product" });
    }
});
//DELETE /dashboard/:productId/delete: Elimina un producto.

router.delete("/dashboard/:productId/delete", async (req, res) => {
    try {
        const id = req.params.productId
        const deleteProduct = await Product.findByIdAndDelete(id)
        if (!deleteProduct) {
            return res.json({ error: "Product  not found" })
        }
        res.status(200).send(`${deleteProduct} deleted successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to delete the post" });
    }
})
//GET /dashboard: Devuelve el dashboard del administrador. 
// En el dashboard aparecerán todos los artículos que se hayan subido. 
// Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.

router.get("/dashboard", async (req, res) => {
    try {
        const products = await Product.find()
        res.status(201).send(`<h1>Lista de productos</h1>
         ${products.map((el) => `<ul><li>${el.Nombre}<a href ="/dashboard/${el._id}/edit"> Modificar</a>
         </li>
         <li>${el.id}<a href ="/dashboard/${el._id}/delete"> Eliminar</a>
         <li>${el.Descripcion}</li>
         <li>${el.Categoria}</li>
         <li>${el.Talla}</li>
         <li>${el.Precio}</li>
         <li><img src="${el.Imagen}"></img></li>
         </li>

        </ul>`)}
    `)
    }
    catch {
        res.status(500).send({ message: "There was a problem to trying to get the products" })
    }
})


//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.get("/dashboard/new", async (req, res) => {
    try {
        res.status(200).send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Formulario Producto</title>
      </head>
      <body>
      <h1>Formulario para crear un producto</h1>
          <form action="/dashboard" method="post" enctype="multipart/form-data">
              <p><label for="Nombre">Nombre:</label>
              <input type="text" id="Nombre" name="Nombre" required></p>

              <p><label for="Descripcion">Descripcion:</label>
              <input type="text" id="Descripcion" name="Descripcion" required></p>
              
             <p> <label for="imagen">Imagen:</label>
              <input type="file" id="imagen" name="imagen"></p>

              <p><label for="Categoria">Categoria:</label>
              <input type="text" id="Categoria" name="Categoria" required></p>

              <p><label for="Talla">Talla:</label>
              <input type="text" id="Talla" name="Talla" required></p>

              <p><label for="Precio">Precio:</label>
              <input type="text" id="Precio" name="Precio" required></p>
              <p><button type="submit">Enviar</button></p>
          </form>
      </body>
      </html>`)
    }
    catch {
        res.status(500).send({ message: "There was a problem to trying to get the products" })
    }

})

//GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get("/dashboard/:productId", async (req, res) => {
    try {
        const prodcutId = await Product.findById(req.params.productId);
        if (!prodcutId) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).json(`${prodcutId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get the post" });
    }
});

//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

router.get("/dashboard/:productId/edit", async (req, res) => {
    try {
        const prodcutId = await Product.findById(req.params.productId);
        if (!prodcutId) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Formulario Producto</title>
        </head>
        <body>
        <h1>Formulario para editar un producto</h1>
            <form action="/dashboards" method="post" id="form">
                <p><label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required></p>
  
                <p><label for="Descripcion">Descripcion:</label>
                <input type="text" id="Descripcion" name="Descripcion" required></p>
                
               <p> <label for="imagen">Imagen:</label>
                <input type="img" id="imagen" name="imagen"></p>
  
                <p><label for="Categoria">Categoria:</label>
                <input type="text" id="Categoria" name="Categoria" required></p>
  
                <p><label for="Talla">Talla:</label>
                <input type="text" id="Talla" name="Talla" required></p>
  
                <p><label for="Precio">Precio:</label>
                <input type="text" id="Precio" name="Precio" required></p>
                <p><button type="submit">Editar</button></p>
            </form>

        </body>
        </html>`)

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the product" });
    }
});

module.exports = router