const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController.js');

const userRouter = express.Router();

// Rutas para CRUD de usuarios
userRouter.route('/users')
    .get(auth, userController.getAllUsers) // Obtener todos los usuarios
    .post(auth, userController.createUser); // Crear un nuevo usuario

userRouter.route('/users/:id')
    .get(auth, userController.getUserById) // Obtener un usuario por su ID
    .put(auth, userController.updateUser) // Actualizar un usuario por su ID
    .delete(auth, userController.deleteUser); // Eliminar un usuario por su ID

module.exports = userRouter;
