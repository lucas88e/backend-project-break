const Product = require("../models/Product.js")
const createProduct = async (req,res) => {
	try{const createProduct =await Product.create(req.body)

		res.status(201).send(createProduct).redirect("/dashboard") }
		
		catch(error){
			console.log(error);
			res.status(500).send("No se pudo crear el Producto revisa el modelo")
			
		}
		
	};
	

	// const productDetails = {Nombre: "Zapoatos",
	// Descripcion: "Publicado",
	// Categoria: ["Zapatos"],
	// Talla: "X"}
	// createProduct(productDetails)

	// const showProducts = async() =>{
	// 	try {
	// 		const products = await Product.find()
	// 		res.status(201).send(`<h1>Lista de productos</h1>
	// 		 ${products.map((el) => `<ul><li><a href ="/products/${el._id}">${el.Nombre}</a>
	// 		 </li>
	
	// 		</ul>`)}
	// 	`)
	// 	}
	// 	catch {
	// 		res.status(500).send({ message: "There was a problem to trying to get the products" })
	// 	}

	// }
function getNavBar(){const html = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="container-fluid">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	<span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
	<div class="navbar-nav">
	  <a class="nav-link active" aria-current="page" href="#">Home</a>
	  <a class="nav-link" href="#">Features</a>
	  <a class="nav-link" href="#">Pricing</a>
	  <a class="nav-link disabled" aria-disabled="true">Disabled</a>
	</div>
  </div>
</div>
</nav>`
return html

}
const baseHtml = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Formulario Producto</title>
	<link
	rel = "stylesheet" 
	href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"/>
</head>
<body>
<script src = https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js>
</script>
</body>
</html>`
const showProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(201).send(`<h1>Lista de productos</h1>
         ${products.map((el) => `<ul><li><a href ="/products/${el._id}">${el.Nombre}</a>
         </li>
         

        </ul>`)}
    `)
    }
    catch {
        res.status(500).send({ message: "There was a problem to trying to get the products" })
    }
};
	  

	function getProductCards(products) {
		let html = '';
		for (let product of products) {
		  html += `
			<div class="product-card">
			  <img src="${product.image}" alt="${product.name}">
			  <h2>${product.name}</h2>
			  <p>${product.description}</p>
			  <p>${product.price}€</p>
			  <a href="/products/${product._id}">Ver detalle</a>
			</div>
		  `;
		}
		return html;
	  }
    module.exports = {createProduct,showProducts}