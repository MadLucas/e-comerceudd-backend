const express = require('express');
const auth = require('../middleware/auth');
const productController = require('../controllers/productController');

const productRouter = express.Router();

// Rutas para CRUD de productos
productRouter.route('/products')
    .get( productController.getAllProducts) // Obtener todos los productos
    .post( productController.createProduct); // Crear un nuevo producto

productRouter.route('/products/:id')
    .get(auth, productController.getProductById) // Obtener un producto por ID
    .put(auth, productController.updateProduct) // Actualizar un producto por ID
    .delete(auth, productController.deleteProduct); // Eliminar un producto por ID



module.exports = productRouter;
