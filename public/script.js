
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