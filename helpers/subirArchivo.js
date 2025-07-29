import {v4 as uuidv4} from 'uuid';
import path from 'path'
import {promises as fs } from 'fs';
import {fileURLToPath} from 'url';

const_dirname= path.dirname(fileURLToPath(import.meta.url));

const subirArchivo=async(
    files,
    extensionesValidas =['jpeg','jpg','Png','git'],
    carpetaDestino='uploads',
    prefijo='doc'   
)=>{
    //valido
    if(!files?.archivo)throw new Error('No se proporciono ningun archivo');
    const {archivo}=files;
    //limpio el nombre y la extension para evitar ataques 
    const nombrelimpio=archivo.name.replace(/[^a-zA-Z0-9._-]/g, '');
    const extension = path.extname(nombreLimpio).slice(1).toLowerCase();
    //validacion de extensión
    if(!extensionesValidas.includes(extension)){
        throw new Error(`Extension no permitida:${extension}.solo:[${extensionesValidas}]`);
    }

}   