
const express = require('express')
const app = express()
const port = 3005
const  {dbConnection}  = require('./config/db');

const routes = require("./routes/ProductRoutes.js");
app.use(express.json())
// app.use(express.urlencoded({extended:false}))
app.use("/",routes)


dbConnection()

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})