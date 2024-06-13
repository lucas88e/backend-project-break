const Product = require("../models/Product.js");
const {getNavBar,baseHtml,endHtml} = require("./esstructura.js")


const createProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("Imagen no proporcionada");
        }

        const imagePath = `/images/${req.file.filename}.png`;
        const productData = {
            ...req.body,
            Imagen: imagePath 
        };

        const createProduct = await Product.create(productData);
        res.status(201).send(createProduct);
        console.log(createProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("No se pudo crear el Producto, revisa el modelo");
    }
};


const deleteProduct = async (req, res,next) => {
    try {
        const id = req.params.productId
        const deleteProduct = await Product.findByIdAndDelete(id)
        if (!deleteProduct) {
            return res.json({ error: "Product  not found" })
        }
        res.status(200).send(`${deleteProduct} deleted successfully`);
    } catch (error) {
        // console.error(error);
        // res.status(500).send({ message: "There was a problem trying to delete the post" });
        next()
    }
}
const updateProduct = async (req, res,next) => {
    try {
        const id = req.params.productId
        const updateProduct = await Product.findByIdAndUpdate(id, req.body,
            { new: true }
        )
        if (!updateProduct) {
            return res.json({ error: "Product  not found" })
        }
        console.log(updateProduct)
        res.status(200).send(`${updateProduct} update successfully`);
    } catch (error) {
        next();
    }
}



const register = async (req, res) => {

 
    res.send(`<h1>Para registrarse introduzca su usuario y contraseña. ¡NO LO OLVIDE!</h1><form action="/register" method = "POST">
 
        <label for="username"> Usuario: </label>
        <input type="text" id="username" name="username" required><br>
        <label for="password">Contaseña</label>
        <input type="password" id="password" name="password" required><br>
        <p><button type="submit">Registrarse</button></p>
        </form> `)
}
const categorias = async (req,res)=>{
	const categorias = req.params.categorias
	const categoriasArray = categorias.split(',');

	const todasCategorias = await Product.find({ Categoria: categoriasArray }) 


	res.status(201).send(`${baseHtml}
    ${getNavBar()}
                 ${todasCategorias.map((el) => `<h1>Lista de productos</h1>
                    <ul><li>${el.Nombre}
                </li>
                 <li>${el.Descripcion}</li>
                 <li>${el.Categoria}</li>
                 <li>${el.Talla}</li>
                 <li>${el.Precio}</li>
                <li><img src="${el.Imagen}"/></li>
               </ul>`)}
            ${endHtml}`)

}


const productsId = async (req, res) => {
    try {
        const productId = await Product.findById(req.params.productId);
        if (!productId) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(`${baseHtml}${getNavBar()}
          <h1>Sesion Iniciada</h1>
        <h2> ${productId.Nombre} es el articulo selecionado</h2>
        <ul>
        <p><li> <b>Nombre:</b> ${productId.Nombre}</li></p>
        <p><li> <b>Descripción:</b> ${productId.Descripcion}</li></p>
        <p><li> <b>Categoria:</b> ${productId.Categoria}</li></p>
        <p><li> <b>Talla:</b> ${productId.Talla}</li></p>
        <p><li> <b>Precio:</b> ${productId.Precio}</li></p>
        <li><b>Imagen:</b><img src="${productId.Imagen}"/></li>
        </ul>
        
       ${endHtml}`);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get the post" });
    }
}
const dashboardProduct = async (req, res) => {
    try {
        const productId = await Product.findById(req.params.productId);
        if (!productId) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send(`${baseHtml}${getNavBar()}
                <h1>Sesion de administrador</h1>
                <h2> ${productId.Nombre} es el articulo seleccionado</h2>
                <ul>
                    <p><li> <b>Nombre:</b> ${productId.Nombre}</li></p>
                    <p><li> <b>Descripción:</b> ${productId.Descripcion}</li></p>
                    <p><li> <b>Id:</b> ${productId._id}</li></p>
                    <p><li> <b>Categoria:</b> ${productId.Categoria}</li></p>
                    <p><li> <b>Talla:</b> ${productId.Talla}</li></p>
                    <p><li> <b>Precio:</b> ${productId.Precio}</li></p>
                     <p><li> <b>Imagen:</b><img src="${productId.Imagen}"/></li></p>
                </ul>
                <a href="/dashboard/${productId._id}/edit" class="btn btn-primary">Modificar</a>
                <button onClick="deleteProduct()" id="btnDelete" class="btn btn-danger">Eliminar</button>
                <script>
                    async function deleteProduct() {
                        try {
                            const response = await fetch('/dashboard/${productId._id}/delete', {
                                method: 'DELETE',
                               
                            });
                            if (response.ok) {
                                alert('Producto eliminado exitosamente');
                                window.location.href = '/dashboard';
                            } else {
                                alert('Error al eliminar el producto');
                            }
                        } catch (error) {
                            console.error('Error al eliminar el producto:', error);
                            alert('Error al eliminar el producto');
                        }
                    }
                </script>
           ${endHtml}`);

            console.log(productId.Imagen)

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get the product" });
    }
}


module.exports = { register, createProduct,dashboardProduct, deleteProduct,categorias, productsId,updateProduct }



// const showProductss = async (req, res) => {
//     try {
//         const products = await Product.find()
//         res.status(201).send(`<h1>Lista de productos</h1>
//             <h2> Sesion iniciada </h2>
//          ${products.map((el) => `<ul><li><a href ="/products/${el._id}">${el.Nombre}</a>
//          </li>
//          <b>Imagen:</b><img src="${el.Imagen}"/>
//         </ul>`)
    
//     }
//     `)
//     console.log(products)}
//     catch {
//         res.status(500).send({ message: "There was a problem to trying to get the products" })
//     }
// };
// const showEditProduct = async (req, res) => {
//     try {
//         const productId = await Product.findById(req.params.productId);
//         if (!productId) {
//             return res.status(404).send({ message: "Product not found" });
//         }

//         res.status(200).send(`<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Formulario Producto</title>
//         </head>
//         <body>
//         <h1>Formulario para editar un producto</h1>
//             <form action="/dashboard/${productId._id}?_method="PUT" method="PUT" id="form">
//                 <p><label for="nombre">Nombre:</label>
//                 <input type="text" id="nombre" name="nombre" required></p>
  
//                 <p><label for="Descripcion">Descripcion:</label>
//                 <input type="text" id="Descripcion" name="Descripcion" required></p>
                
//                <p> <label for="imagen">Imagen:</label>
//                 <input type="img" id="imagen" name="imagen"></p>
  
//                 <p><label for="Categoria">Categoria:</label>
//                 <input type="text" id="Categoria" name="Categoria" required></p>
  
//                 <p><label for="Talla">Talla:</label>
//                 <input type="text" id="Talla" name="Talla" required></p>
  
//                 <p><label for="Precio">Precio:</label>
//                 <input type="text" id="Precio" name="Precio" required></p>
//                 <p><button type="submit">Editar</button></p>
//             </form>
//         </body>
//         </html>`)

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "There was a problem trying to update the product" });
//     }
// }
// const dashboard = async (req, res) => {
//     try {
//         const products = await Product.find()
//         res.status(201).send(`<h1>Lista de productos</h1>
//         ${products.map((el) => `<ul><li>${el.Nombre}
//         </li>
//         <li>${el.Descripcion}</li>
//         <li>${el.Categoria}</li>
//         <li>${el.Talla}</li>
//         <li>${el.Precio}</li>
//         <li><img src="${el.Imagen}"/></li>
//         <a href ="/dashboard/${el._id}"> Gestionar como administrador</a>

//        </ul>`)}
//    `)
//     }
//     catch {
//         res.status(500).send({ message: "There was a problem to trying to get the products" })
//     }
// }
