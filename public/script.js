
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


// const registerForm = document.getElementById("register-form");

//     // Evento para manejar el envío del formulario
//     registerForm.addEventListener('submit', (e) => {
//       e.preventDefault();

//       // Obtener los valores del formulario
//       const email = document.getElementById("register-email").value;
//       const password = document.getElementById("register-password").value;

//       // Obtener los usuarios guardados en el localStorage
//       let users = JSON.parse(localStorage.getItem("users")) || [];

//       // Verificar si el usuario ya está registrado
//       const isUserRegistered = users.find(user => user.email === email);
//       if (isUserRegistered) {
//         return alert("El usuario ya existe");
//       }

//       // Añadir el nuevo usuario a la lista
//       users.push({ email: email, password: password });

//       // Guardar la lista de usuarios actualizada en el localStorage
//       localStorage.setItem("users", JSON.stringify(users));

//       // Mostrar mensaje de éxito
//       alert("Registro exitoso");

//       // Opcional: Limpiar el formulario después del registro
//       registerForm.reset();
//     });

//   const loginForm =document.getElementById('login-form')
//   loginForm.addEventListener('submit',  (e) => {
//       e.preventDefault();
  
//       const email = document.getElementById("login-email").value;
//       const password = document.getElementById("login-password").value;

//     const Users = JSON.parse(localStorage.getItem('users'))||[]
//     const validUser=Users.find(user=> user.email ===email && user.password===password)
//     if(!validUser){
//     return alert("Username or password incorrect!")}
  
//   alert("Bienvenido")        
//   localStorage.setItem("login_success", JSON.stringify(validUser))
//   });

 
  
// const user = JSON.parse(localStorage.getItem("login_success"))|| false

// if(!user){
//   window.location.href 
// }

const login = document.getElementById("login-form")
login.addEventListener   ('submit', async (e) => {
  e.preventDefault();
  const data = {
      email: e.target[0].value,
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
  console.log('Login successful');
} else {
  throw new Error('Login failed');
}
} catch (error) {
console.error('Error:', error);
}
})



const token = localStorage.getItem('authToken');
fetch('/dashboard', {
    method: 'GET',
    headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
    }
}).then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Acceso denegado');
    }
}).then(data => {
    console.log('Datos protegidos:', data);
}).catch(error => {
    console.error('Error:', error);
});
