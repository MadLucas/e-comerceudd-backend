// Librerias
const express = require('express');
const productRouter = require('./routes/ProductRoutes')
const userRouter = require('./routes/UserRoute')
const cors = require('cors')
require('dotenv').config();

const app = express();

require('./config/database');

const puerto = process.env.PORT

//Middleware 

app.use(express.json()) // sirve para que el servidor entienda lo que me envian (JSON)
app.use(cors())


// let productos = [{
// }]

// app.get("/products")

// app.post("/register", (req, res) => {
//     const {username, password} = req.body;
//     res.json({message:`bienvenido ${username}`})
// })

// app.post("/createProduct", (req, res) => {
//     const {nombre, valor} = req.body; 

//     productos.push({
//         nombre,
//         valor
//     })

//     res.json({succes: true, message:`se hacreado el producto`, productCreated: nombre})
// })

//Levantar servidor
// PORT 8080
app.listen(process.env.PORT, () => console.log(`conectando en puerto ${puerto}!`))

app.use(productRouter)
app.use(userRouter)