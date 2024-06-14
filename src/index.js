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
const templatePath= __dirname.replace("app","template")
// console.log(templatePath)
app.use(session({
  secret:process.env.jwtPrivateKey,
  resave:false,
  saveUninitialized:true,
  cookie:{secure:true}
}))



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",router)
app.use(helmet())
app.use(compression())
app.use(methodOverride('_method'));
app.use("/", require("./routes/authRoutes.js"))

app.use( express.static(path.join(__dirname, '..','public')))
app.set("views",`${templatePath}`)
app.set("view engine","pug")
app.get("/",(req,res,next)=>{
  res.render("index")
  next()
})
app.use(require("./middelware/errors.js"))
dbConnection()


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

