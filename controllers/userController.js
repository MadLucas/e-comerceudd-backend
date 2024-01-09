const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, msg: 'Lista de usuarios', info: users });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'Usuario no encontrado' });
        }
        res.json({ success: true, msg: 'Usuario encontrado', info: user });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const userEmail = await User.findOne({email: req.body.email})
        if(userEmail){
            throw new Error("Email en uso!")
        }
        const newUser = new User(req.body);
        newUser.encriptarPassword(req.body.password);
        await newUser.save();
        res.json({success: true, message: "Usuario Creado", info: newUser._id, token: newUser.generateToken()})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, msg: 'Usuario no encontrado' });
        }
        res.json({ success: true, msg: 'Usuario actualizado', info: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ success: false, msg: 'Usuario no encontrado' });
        }
        res.json({ success: true, msg: 'Usuario eliminado', info: deletedUser });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}); // buscando email en mongo atlas
    
        if(!user){
            throw new Error("Usuario no existe!") // no encontro el usuario
        } 

        const validarPassword = user.verificarEncriptacion(password, user.salt, user.password)

        if(!validarPassword){
            throw new Error('Email o contraseña incorrecta!')
        }

        res.json({success: true, msg: "Has iniciado sesion correctamente!", token: user.generateToken()})


    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};
