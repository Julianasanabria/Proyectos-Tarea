import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import subirArchivo from "./subirArchivo.js";
import Holder from '../models/holder.js'; // Cambia por tu modelo real
import cloudinary from 'cloudinary';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const cargarArchivo = async (req, res) => {
    const { id } = req.params;
    try {
        let nombre = await subirArchivo(req.files, undefined);

        let holder = await Holder.findById(id);
        if (holder.photo) {
            const pathImage = path.join(__dirname, '../uploads/', holder.photo);
            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }
        holder = await Holder.findByIdAndUpdate(id, { photo: nombre }, { new: true });
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({ error, general: 'controlador' });
    }
};

export const mostrarImagen = async (req, res) => {
    const { id } = req.params;
    try {
        let holder = await Holder.findById(id);
        if (holder.photo) {
            const pathImage = path.join(__dirname, '../uploads', holder.photo);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage);
            }
        }
        res.status(400).json({ msg: 'Falta Imagen' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const cargarArchivoCloud = async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });
    const { id } = req.params;
    try {
        const { tempFilePath } = req.files.archivo;
        cloudinary.uploader.upload(tempFilePath,
            { width: 250, crop: "limit" },
            async function (error, result) {
                if (result) {
                    let holder = await Holder.findById(id);
                    if (holder.photo) {
                        const nombreTemp = holder.photo.split('/');
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1];
                        const [public_id] = nombreArchivo.split('.');
                        cloudinary.uploader.destroy(public_id);
                    }
                    holder = await Holder.findByIdAndUpdate(id, { photo: result.url }, { new: true });
                    res.json({ url: result.url });
                } else {
                    res.json(error);
                }
            });
    } catch (error) {
        res.status(400).json({ error, general: 'Controlador' });
    }
};

export const mostrarImagenCloud = async (req, res) => {
    const { id } = req.params;
    try {
        let holder = await Holder.findById(id);
        if (holder.photo) {
            return res.json({ url: holder.photo });
        }
        res.status(400).json({ msg: 'Falta Imagen' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

