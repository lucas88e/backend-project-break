console.log("enlazado correctamente");



const form = document.getElementById('form');
const btn = document.getElementById('btn');

if(form){
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        console.log(e.target[0].value);
    
        const data = {
            nombre: e.target[0].value,
            descripcion: e.target[1].value,
            imagen: e.target[2].value,
            categoria: e.target[3].value,
            talla: e.target[4].value,
            precio: e.target[5].value
        }
    
        fetch(`http://localhost:3005/dashboard/${product._id}/edit`, {
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
// form.addEventListener("submit",(e)=>{
//     e.preventDefault()
//     console.log("click")
// })

// module.exports = console.log("Bien")