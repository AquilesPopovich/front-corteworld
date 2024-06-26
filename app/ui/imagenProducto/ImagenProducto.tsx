'use client'
import { ProductsList } from "@/app/types/typeProduct";
import axiosURL from "@/axiosConfig/axiosConfig";
import styles from './imagenProducto.module.css'
import { useState } from "react";

interface Props {
    imagenes: boolean
    setImagenes: (value: boolean) => void;
    productos: ProductsList
}

const ImagenProducto: React.FC<Props> = ({ imagenes, setImagenes, productos }) => {
    if (!imagenes) return null;
    console.log(productos)
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleSelectChange = (event: any) => {
        setSelectedProductId(event.target.value);
    };

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'ml_default');
                const cloudinaryResponse = await axiosURL.post(`/imgProduct/upload/${selectedProductId}`, formData);
                console.log(cloudinaryResponse.data);
                setSelectedProductId(null)
                setImagePreview('');
                setImagenes(false);
                window.alert('Imagen añadida a producto!')
            }

        } catch (error) {
            console.error('Error al añadir la imagen:', error);
        }
    };


    return (
        <div className={`fixed flex justify-center items-center h-2/4 w-3/6 left-1/4 top-1/4 bottom-10 border-solid rounded-lg bg-slate-50 p-4 ${styles.container}`}>
                <form className={`flex flex-col justify-center gap-10 items-start h-full w-full ${styles.form}`} onSubmit={handleSubmit}>
                    <div className={`text-black text-xl flex flex-col gap-2 ${styles.select}`}> 
                    <h1 className="font-bold">Producto: </h1>
                        <select className={` bg-gray-200 rounded-md text-sm ${styles.selectW}`} name="" id="file" onChange={handleSelectChange}>
                            <option value="" className=" text-sm">Selecciona un producto...</option>
                            {productos?.map(producto => (
                                <option className="text-black" value={producto.id}>{producto.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={`flex flex-row justify-stretch gap-7 font-bold ${styles.fileContainer}`}>
                        <label 
                        className={styles.label}
                        htmlFor="imgs">Buscar Archivo</label>
                        <input className={styles.inputFile} type="file" id="file" onChange={handleFileChange} />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ width: '100px', height: '100px', marginTop: '10px' }}
                            />
                        )}
                    </div>
                    <div className="flex gap-8">
                    <button className={` bg-pink-200 rounded-md hover:bg-pink-400 ${styles.buttons}`} type="submit">Añadir Imagen</button>
                <button className={`bg-pink-200 rounded-md hover:bg-pink-400 ${styles.buttons}`} onClick={() => setImagenes(false)}>Cancelar</button>
                    </div>
                </form>
        </div>
    )
}
export default ImagenProducto;