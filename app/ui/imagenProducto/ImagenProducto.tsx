'use client'
import { ProductsList } from "@/app/types/typeProduct";
import axiosURL from "@/axiosConfig/axiosConfig";
import { useAppSelector } from "@/redux/hook";
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
            }
            
        } catch (error) {
        console.error('Error al añadir la imagen:', error);
        }
    };


    return (
        <div>
            <button onClick={() => setImagenes(false)}>X</button>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <select className="text-black" name="" id="" onChange={handleSelectChange}>
                        {productos?.map(producto => (
                            <option className="text-black" value={producto.id}>{producto.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="imgs">Upload File</label>
                    <input type="file" id="file" onChange={handleFileChange} />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: '100px', height: '100px', marginTop: '10px' }}
                        />
                    )}
                </div>
                <button type="submit">Añadir Imagen a producto</button>
            </form>
        </div>
    )
}
export default ImagenProducto;