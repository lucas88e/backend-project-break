const Product = require("../models/Product.js")

function getNavBar() {
  const html = `
    <nav class="navbar navbar-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container">
          <a class="navbar-brand" href="#">Tu Tienda</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
               <li class="nav-item ">
                <a class="nav-link" href="/products">Productos</a>
              </li>
              <li class="nav-item ">
                 <a class="nav-link active" aria-current="page" href="/productos/Camisetas">Camisetas</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link active" aria-current="page" href="/productos/Zapatos">Zapatos</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link active" aria-current="page" href="/productos/Pantalones">Pantalones</a>
              </li>
              <li class="nav-item ">
               <a class="nav-link active" aria-current="page" href="/productos/Accesorios">Accesorios</a>
              </li>
              <li class="nav-item ">
              <a class="nav-link active" aria-current="page" href="/dashboard/new">Nuevo Producto</a>
              </li>
              <li class="nav-item logged-out">
                <a class="nav-link active" aria-current="page" href="#" data-bs-toggle="modal" data-bs-target="#login">Login</a>
              </li>
              <li class="nav-item logged-out">
                <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#register">Register</a>
              </li>
              <li class="nav-item logged-in">
                <a class="nav-link active" href="#" id="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    <!-- Login Modal -->
<div class="modal fade" id="login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog" >
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title"  id="exampleModalLabel">Login</h5>
          <button type="button" class="btn-close  btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form id="login-form">
            <label for="email">Email:</label>
            <input type="text" class="form-control mb-3" id="login-email" placeholder="Username" required>
            <label for="password">Password:</label>
            <input type="password" id="login-password" class="form-control mb-3" placeholder="******" required>
            <button type="submit"  class="btn btn-primary" id="btn-login">Login</button>
           <button type="submit"  class="btn btn-primary" id="btn-protected">protected</button>

            </form>
        </div>
        
      </div>
    </div>
  </div>

      <!-- Register Modal -->
<div class="modal fade" id="register" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Register</h1>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form id="register-form">
                <label for="email">Email:</label>
                <input type="text" class="form-control mb-3" id="register-email" placeholder="Email" required>
                <label for="password">Password:</label>
                <input type="password" class="form-control mb-3" id="register-password" placeholder="******" required>
                <button type="submit" class="btn btn-primary">Register</button>
                </form>
        </div>
       
      </div>
    </div>
  </div>

   <script>
// JavaScript en el cliente (navegador)
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout');

// LOGIN
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        username: e.target[0].value,
        password: e.target[1].value,
    };

    try {
        const res = await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const token = res.headers.get('x-auth-token');
            if (token) {
               
                localStorage.setItem('authToken', token);
            }
            console.log("Login exitoso");
            window.location.href = "/products";
            throw new Error('Login fallido');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// LOGOUT
  logoutButton.addEventListener('click', () => {
    // Remover el token del almacenamiento local (localStorage)
    localStorage.removeItem('authToken');
    window.location.href = '/products'; // Redirigir a la página de productos u otra página
});


</script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>`
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
  <link rel="stylesheet" href="/styles.css"/>
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
    
        fetch("/dashboard/${product._id}", {
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



function dashboards(products) {
  try {
    let html = '';
    for (let product of products) {
      html +=
      ` 
      <div class="card" style="width: 20rem;">
      <img src="${product.Imagen}"class="card-img-top" alt="${product.Nombre}"/>
      <div class="card-body">
        <h5 class="card-title">${product.Nombre}</h5>
        <p class="card-text">${product.Descripcion}</p>
        <a href ="/dashboard/${product._id}" class="btn btn-primary">Gestionar como administrador</a>
      </div>
    </div>
    `;
 
    }     return html
  }
  catch (error) {
    console.error(error);
  }
}
function showProduct(products) {
  try {
    let html = `<h1>Lista de productos</h1>
            <h2> Sesion iniciada </h2>
            <div class="card-group">`;
    for (let product of products) {
      html +=

      `<div class="card" style="width: 10rem;">
      <img src="${product.Imagen}"class="card-img-top" alt="${product.Nombre}"/>
      <div class="card-body">
        <h5 class="card-title">${product.Nombre}</h5>
        <p class="card-text">${product.Descripcion}</p>
        <a href ="/products/${product._id}" class="btn btn-primary">Mas información</a>
      </div>
    </div>`

        ; 
    }return html
  }
  catch (error) {
    console.error(error);
  }
}
{/* <ul><li><a href ="/products/${product._id}">${product.Nombre}</a>
</li>
<b>Imagen:</b><img src="${product.Imagen}"class="card-img-bottom" alt="${product.Nombre}"/>
</ul> */}



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

const dashboard = async (req, res) => {
  const products = await Product.find();
  const productCards = dashboards(products);
  const html = baseHtml + getNavBar() + productCards+endHtml;
  res.send(html);
};

const showProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = showProduct(products);
  const html = baseHtml + getNavBar()+productCards +endHtml;
  res.send(html);
};




module.exports = { getNavBar,baseHtml,endHtml,showProducts,showEditProducts,dashboard, showNewProducts, showEditProducts }
  // const showCamiseta = async (req, res) => {
  //   const camisetas = await Product.find({ Categoria: "Camisetas" })
  //     const productCards = showProduct(camisetas);
  //   const html = baseHtml + getNavBar() + productCards+endHtml;
  //   res.send(html);
  // };

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
  