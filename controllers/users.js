import User from "../models/users.js"
import Role from "../models/roles.js"
import { generarJWT } from "../middlewares/validar-jwt.js"
import bcryptjs from "bcryptjs"

const userController = {
    getAllUsers: async (req, res) => {
        try {
            /* const rolAdmin = await Role.findOne({ name: 'Admin' });
            if (req.user.globalRole.toString() !== adminRole._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'Acceso denegado, solo se permite el Administrador'
                });
            } */
            const usuarios = await User.find(); 
            res.json({ usuarios });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar los usuarios" });
        }
    },
    getUserById: async(req, res) => {
        try {
            const {id} = req.params;
            const user = await User.findById(id);
            res.json({ user });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar el usuario" });
        }
    },
    updateUser: async(req, res) => {
        try {
            const { id } = req.params;
            const { firstName, lastName, email, password, phone, avatar } = req.body;

            const user = await User.findByIdAndUpdate(id, {
                firstName,
                lastName,
                email,
                password,
                phone,
                avatar
            });
            res.json( { msg: "Usuario actualizado correctamente"} );
        } catch (error) {
            res.status(500).json({ msg: "Error. No se pudo actualizar el usuario"})
        }
    },
    deleteUser: async(req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            res.json({ msg: "Usuario eliminado correctamente"})
        } catch (error) {
            res.status(500).json({ msg: "Error al eliminar el usuario"})
        }
    },
    changeRole: async(req, res) => {
        try {
            const { id } = req.params;
            const { roleId } = req.body;

            // 1. Validar datos de entreda
            if (!id || !roleId) {
                return res.status(400).json({
                    success: false,
                    msg: "Se requieren ID de usuario y el ID del rol"
                });
            }
            // 2. Verificar existencia del rol
            const roleExists = await Role.findById(roleId);
            if (!roleExists) {
                return res.status(404).json({
                    success: false,
                    msg: "El rol especifico no existe"
                })
            };
            // 3. Verificar existencia del usuario
            const userExists = await User.findById(id);
            if (!userExists) {
                return res.status(404).json({
                    success: false,
                    msg: "El usuario especifico no existe"
                })
            };
        } catch (error) {
            
        }
    }
}