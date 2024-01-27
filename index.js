const express = require('express');
const productRouter = require('./routes/ProductRoutes');
const userRouter = require('./routes/UserRoute');
const cors = require('cors');
const { carritoRoute } = require('./routes/CarritoRoute');
require('dotenv').config();

const app = express();

require('./config/database');

const puerto = process.env.PORT;

// Middleware
app.use(express.json()); // Sirve para que el servidor entienda lo que le envían (JSON)

// Configuración específica de CORS
const corsOptions = {
    origin: 'https://main--regal-chimera-e19bc1.netlify.app/', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Rutas
app.use(productRouter);
app.use(userRouter);
app.use(carritoRoute);

app.listen(process.env.PORT, () => console.log(`Conectando en puerto ${puerto}!`));
