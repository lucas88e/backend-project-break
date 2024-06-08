
const express = require('express')
const app = express()
const port = 3005 || process.env.PORT
const  {dbConnection}  = require('./config/db');
const helmet = require("helmet")
const compression = require("compression")
const router= require("./routes/ProductRoutes.js");
const session = require("express-session")
const methodOverride = require("method-override")
const path = require('path');
const hashedSecret = require("./config/crypto.js")

app.use(session({
  secret:hashedSecret,
  resave:false,
  saveUninitialized:true,
  cookie:{secrure:true}
}))


app.use("/", require("./routes/authRoutes.js"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",router)
app.use(helmet())
app.use(compression())
app.use(methodOverride('_method'));

app.use('/images', express.static(path.join(__dirname, '..','public','images')))


dbConnection()

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

