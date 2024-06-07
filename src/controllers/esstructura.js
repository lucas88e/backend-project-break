const Product = require("../models/Product.js")


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


function getProductCards(products) {
    let html = '';
    for (let product of products) {
      html += `
        <div class="product-card">
                <img src="${product.Imagen}" alt="${product.Nombre}">

          <h2>${product.Nombre}</h2>
          <p>${product.Descripcion}</p>
          <p>${product.Precio}€</p>
          <a href="/products/${product._id}">Ver detalle</a>
        </div>
      `;
    }
    return html;
  }
  function getNavBar(){const html = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="container-fluid">
  <a class="navbar-brand" href="/products">Productos</a>

  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	<span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
	<div class="navbar-nav">
	  <a class="nav-link active" aria-current="page" href="#">Camisetas</a>
	  <a class="nav-link active" aria-current="page" href="#">Zapatos</a>
	  <a class="nav-link active" aria-current="page" href="#">Pantalones</a>
	  <a class="nav-link active" aria-current="page" href="#">Accesorios</a>
    <a class="nav-link active" aria-current="page" href="#">Login</a>

	</div>
  </div>
</div>
</nav>`
return html

}


const showProducts = async (req, res) => {
    const products = await Product.find();
    const productCards = getProductCards(products);
    const html = baseHtml + getNavBar()+productCards ;
    res.send(html);
  };
      
module.exports ={showProducts,getNavBar,}