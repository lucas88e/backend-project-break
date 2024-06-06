
const express = require('express')
const app = express()
const port = 3005 || process.env.PORT
const  {dbConnection}  = require('./config/db');
const helmet = require("helmet")
const compression = require("compression")
const routes = require("./routes/ProductRoutes.js");
app.use(express.json())
// app.use(express.urlencoded({extended:false}))
app.use("/",routes)
app.use(helmet())
app.use(compression())




dbConnection()

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})