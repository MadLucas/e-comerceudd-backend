
const express = require('express');
const app = express();
require("dotenv").config();



//Middleware 

app.use(express.json()) // sirve para que el servidor entienda lo que me envian (JSON)


const puerto = process.env.PORT

let productos = [{
}]

app.get("/products")

app.post("/register", (req, res) => {
    const {username, password} = req.body;
    res.json({message:`bienvenido ${username}`})
})

app.post("/createProduct", (req, res) => {
    const {nombre, valor} = req.body; 

    productos.push({
        nombre,
        valor
    })

    res.json({succes: true, message:`se hacreado el producto`, productCreated: nombre})
})

//Levantar servidor
// PORT 8080
app.listen(process.env.PORT, () => console.log(`conectando en puerto ${puerto}!`))