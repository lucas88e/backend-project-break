const mongoose =require("mongoose")

const ProductSchema = new mongoose.Schema({
   Nombre:{type:String,required:true},
   Descripcion: {type:String, required:true},
   Imagen: {type:String},
   Categoria: {type: String, enum: ["Camisetas","Zapatos","Pantalones","Accesorios"]},
   Talla:{type:String,enum:["XS","S","M","L","XL"]},
   Precio: {type:String,required:true} 
})
const Product = mongoose.model("Product",ProductSchema)


module.exports = Product