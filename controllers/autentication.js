import users from "../models/users.js"; // Asegúrate de que exista el modelo
import { generarJWT } from "../middlewares/validar-jwt.js"; // Función que genere un JWT

const AuthController ={
    register: async (req, res)=>{
        //const {firstname, lastname, email, password} = req.body;
        try{
            const register = await users.find();
            res.json({register});
        }catch(error){
            res.status(400).json({msg: "Error al buscar el usuario"});
        }
    },
    login:async (req, res) => {
        const {email, password} = req.body;
        try {
            const usuario = await users.findOne({email});

            if (!usuario){
                return res.status(400).json({msg: "Usuario no encontrado"});
            }
            if (password !== usuario.password){
                return res.status(400).json({msg: "Contraseña incorrecta"});
            }

            const token = await generarJWT(usuario.id);

            res.json({
                msg: "Login exitoso",
                usuario,
                token
            })
        } catch (error) {
            res.status(500).json({msg: "Error en el servidor"});
        }
    },

    // Renovar token: Recibe el token anterior, lo verifica y genera uno nuevo
    refreshToken: async (req, res) => {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json({ msg: "Token es requerido" });
            }
            // Verifica el token recibido
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            // Genera un nuevo JWT utilizando el id del usuario
            const newToken = await generarJWT(payload.id);
            res.json({
                msg: "Token renovado exitosamente",
                token: newToken
            });
        } catch (error) {
            res.status(500).json({ msg: "Error al renovar token" });
        }
    },

    // Cerrar sesión: En JWT sin estado, normalmente se maneja en el cliente eliminando el token
    logout: async (req, res) => {
        // Opcional: implementar lógica de blacklist si es necesario
        res.json({ msg: "Logout exitoso" });
    },

    // Recuperar contraseña: Busca el usuario por email y envía (simulado) un correo con instrucciones
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const usuario = await users.findOne({ email });
            if (!usuario) {
                return res.status(400).json({ msg: "Usuario no encontrado" });
            }
            // Aquí se generaría un token o link para restablecer contraseña
            // y se enviaría un correo a usuario.email
            res.json({ msg: "Correo para restablecer contraseña enviado" });
        } catch (error) {
            res.status(500).json({ msg: "Error al procesar la solicitud" });
        }
    },

    // Restablecer contraseña: Verifica el token y actualiza la contraseña del usuario
    resetPassword: async (req, res) => {
        try {
            const { token, newPassword } = req.body;
            // Verifica el token (este debe haber sido generado previamente en una lógica de forgotPassword)
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            const usuario = await users.findById(payload.id);
            if (!usuario) {
                return res.status(400).json({ msg: "Usuario no encontrado" });
            }
            // Actualizar contraseña (considera aplicar hash en la contraseña)
            usuario.password = newPassword;
            await usuario.save();
            res.json({ msg: "Contraseña restablecida exitosamente" });
        } catch (error) {
            res.status(500).json({ msg: "Error al restablecer contraseña" });
        }
    },
};

export default AuthController;