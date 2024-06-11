const Product = require("../models/Product.js")
const {categorias} = require("./productController.js")
function getNavBar() {
  const html = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/products">Productos</a>
  
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-link active" aria-current="page" href="/productos/Camisetas">Camisetas</a>
      <a class="nav-link active" aria-current="page" href="/productos/Zapatos">Zapatos</a>
      <a class="nav-link active" aria-current="page" href="/productos/pantalones">Pantalones</a>
      <a class="nav-link active" aria-current="page" href="/productos/accesorios">Accesorios</a>
      <a class="nav-link active" aria-current="page" href="/sesion">Login</a>
  
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

`
const endHtml = `</body></html>`
// 
function getCreateForm() {
  try {
    let html = '';

    html += `
         
            <h1>Formulario para crear un producto</h1>
                <form action="/dashboard" method="POST" enctype="multipart/form-data">
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
        
            `;

    return html;
  }
  catch {
    res.status(500).send({ message: "There was a problem to trying to get the products" })
  }

}

function editProduct(products) {
  try {
    let html = '';
    for (let product of products) {
      html += `
              <h1>Formulario para editar un producto</h1>
            <form id="form">
                <p><label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" ></p>
  
                <p><label for="Descripcion">Descripcion:</label>
                <input type="text" id="Descripcion" name="Descripcion" ></p>
                
               <p> <label for="imagen">Imagen:</label>
                <input type="img" id="imagen" name="imagen"></p>
  
                <p><label for="Categoria">Categoria:</label>
                <input type="text" id="Categoria" name="Categoria" ></p>
  
                <p><label for="Talla">Talla:</label>
                <input type="text" id="Talla" name="Talla" ></p>
  
                <p><label for="Precio">Precio:</label>
                <input type="text" id="Precio" name="Precio" ></p>
                <p><button id="btn" type="submit">Editar</button></p>
            </form>
          <script>
          const form = document.getElementById('form');
const btn = document.getElementById('btn');

if(form){
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        console.log(e.target[0].value);
    
        const data = {
            Nombre: e.target[0].value,
            Descripcion: e.target[1].value,
            Imagen: e.target[2].value,
            Categoria: e.target[3].value,
            Talla: e.target[4].value,
            Precio: e.target[5].value
        }
    
        fetch("http://localhost:3005/dashboard/${product._id}", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    
    
    
    }); 
}
          
          </script>
       
            `;
      return html
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ message: "There was a problem trying to update the product" });
  }
  ;
}

{/* <script>
async function deleteProduct() {
    try {
        const response = await fetch('/dashboard/${product._id}/delete', {
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
</script> */}
function dashboardProduct(products) {
  try {
    let html = '';
    for (let product of products) {
      html += `
      <h1>Sesion de administrador</h1>
                <h2> ${product.Nombre} es el articulo seleccionado</h2>
                <ul>
                    <p><li> <b>Nombre:</b> ${product.Nombre}</li></p>
                    <p><li> <b>Descripción:</b> ${product.Descripcion}</li></p>
                    <p><li> <b>Id:</b> ${product._id}</li></p>
                    <p><li> <b>Categoria:</b> ${product.Categoria}</li></p>
                    <p><li> <b>Talla:</b> ${product.Talla}</li></p>
                    <p><li> <b>Precio:</b> ${product.Precio}</li></p>
                     <p><li> <b>Imagen:</b><img src="${product.Imagen}"/></li></p>


                </ul>
                <a href="/dashboard/${product._id}/edit" class="btn btn-primary">Modificar</a>
                <button onClick="deleteProduct()" id="btnDelete" class="btn btn-danger">Eliminar</button>
                <script>
                    async function deleteProduct() {
                        try {
                            const response = await fetch('/dashboard/${product._id}/delete', {
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
            `;                    
      return html
    }
  }
  catch (error) {
    console.error(error);
  }
  ;
}
function productId(products) {
  try {
    let html = '';
    for (let product of products) {
      html +=
        `<!DOCTYPE html>
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
          <h1>Sesion Iniciada</h1>
        <h2> ${product.Nombre} es el articulo selecionado</h2>
        <ul>
        <p><li> <b>Nombre:</b> ${product.Nombre}</li></p>
        <p><li> <b>Descripción:</b> ${product.Descripcion}</li></p>
        <p><li> <b>Categoria:</b> ${product.Categoria}</li></p>
        <p><li> <b>Talla:</b> ${product.Talla}</li></p>
        <p><li> <b>Precio:</b> ${product.Precio}</li></p>
        <li><b>Imagen:</b><img src="${product.Imagen}"/></li>
        </ul>
        
        `;
      return html
    }
  }
  catch (error) {
    console.error(error);
  }
}

function dashboards(products) {
  try {
    let html = '';
    for (let product of products) {
      html +=
        `<h1>Lista de productos</h1>
         <ul><li>${product.Nombre}
        </li>
        <li>${product.Descripcion}</li>
        <li>${product.Categoria}</li>
        <li>${product.Talla}</li>
        <li>${product.Precio}</li>
        <li><img src="${product.Imagen}"/></li>
        <a href ="/dashboard/${product._id}"> Gestionar como administrador</a>

       </ul>`;
 
    }     return html
  }
  catch (error) {
    console.error(error);
  }
}
function showProduct(products) {
  try {
    let html = `<h1>Lista de productos</h1>
            <h2> Sesion iniciada </h2>`;
    for (let product of products) {
      html +=
        `
         <ul><li><a href ="/products/${product._id}">${product.Nombre}</a>
         </li>
         <b>Imagen:</b><img src="${product.Imagen}"/>
        </ul>`

        ; 
    }return html
  }
  catch (error) {
    console.error(error);
  }
}




// 
const showNewProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = getCreateForm(products);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};
const showEditProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = editProduct(products);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};
const dashboardProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = dashboardProduct(products);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};

const productsId = async (req, res) => {
  const products = await Product.find();
  const productCards = productId(products);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};

const dashboard = async (req, res) => {
  const products = await Product.find();
  const productCards = dashboards(products);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};

const showProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = showProduct(products);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};
const showCamiseta = async (req, res) => {
  const camisetas = await Product.find({ Categoria: "Camisetas" })
    const productCards = showProduct(camisetas);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};
const showZapatos= async (req, res) => {
  const zapatos = await Product.find({ Categoria: "Zapatos" })
    const productCards = showProduct(zapatos);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};
const categori = async (req, res) => {
  const categorias = req.params.categorias
	const categoriasArray = categorias.split(',');
	const todasCategorias = await Product.find({ Categoria: categoriasArray })
  const productCards = showProducts(todasCategorias);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};


module.exports = { showCamiseta,getNavBar,baseHtml,endHtml,showZapatos,showProducts,showEditProducts,dashboard, productsId, dashboardProducts, showNewProducts, showEditProducts }

// const showProducts = async (req, res) => {
//   //   const products = await Product.find();
//   //   const productCards = getProductCards(products);
//   //   const html = baseHtml + getNavBar() + productCards;
//   //   res.send(html);
//   // };

// function getProductCards(products) {
  //   let html = '';
  //   for (let product of products) {
  //     html += `
  //         <div class="product-card">
  //                 <img src="${product.Imagen}" alt="${product.Nombre}">
  
  //           <h2>${product.Nombre}</h2>
  //           <p>${product.Descripcion}</p>
  //           <p>${product.Precio}€</p>
  //           <a href="/products/${product._id}">Ver detalle</a>
  //         </div>
  //       `;
  //   }
  //   return html;
  // }
  