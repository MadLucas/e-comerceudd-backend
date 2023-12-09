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
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ success: true, msg: 'Usuario creado exitosamente', info: newUser });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
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

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
