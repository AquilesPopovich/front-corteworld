'use client'
import { ProductsList } from "@/app/types/typeProduct";
import axiosURL from "@/axiosConfig/axiosConfig";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";

interface Props {
    stock: boolean
    setStock: (value: boolean) => void;
    productos: ProductsList
}

const AgregarStock: React.FC<Props> = ({ stock, setStock, productos }) => {
    if (!stock) return null;
 console.log(productos)
    const [file, setFile] = useState(null);

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
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64String = reader.result.split(',')[1];
                    const data = {
                        file: base64String,
                        idProduct: selectedProductId, // Asegúrate de tener este estado
                    };
                    console.log(data)
                    const response = await axiosURL.post('/imgProduct', data);
                    console.log(response.data);
                };
                reader.readAsDataURL(file);
            }
            
        } catch (error) {
        console.error('Error al añadir la imagen:', error);
        }
    };


    return (
        <div>
            <button onClick={() => setStock(false)}>X</button>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <select className="text-black" name="" id="" onChange={handleSelectChange}>
                        {productos?.map(producto => (
                            <option className="text-black" value={producto.id}>{producto.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                <select className="text-black" name="" id="" onChange={handleSelectChange}>
                        <option className="text-black" value='xs'>xs</option>
                        <option className="text-black" value='s'>s</option>
                        <option className="text-black" value='m'>m</option>
                        <option className="text-black" value='l'>l</option>
                        <option className="text-black" value='xl'>xl</option>
                    </select>
                </div>
                <div>
                <label  className="text-black" htmlFor="discount">
                color
                </label>
                <input
                className="text-black"
                type="text"
                id="color"
                name="color"
                placeholder="agregar el color de la prenda"
                />
                </div>
                <button type="submit">Añadir Imagen a producto</button>
            </form>
        </div>
    )
}
export default AgregarStock;