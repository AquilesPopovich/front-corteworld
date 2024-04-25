// AgregarStockModal.tsx
import { ProductsList } from "@/app/types/typeProduct";
import axios from "axios";
import { useState } from "react";
import style from './stock.module.css';

interface Props {
    stock: boolean;
    setStock: (value: boolean) => void;
    productos: ProductsList;
}

const AgregarStockModal: React.FC<Props> = ({ stock, setStock, productos }) => {
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [color, setColor] = useState<string>('');

    if(!stock) return null


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProductId(event.target.value);
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSize(event.target.value);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const stockData = {
                productId: selectedProductId,
                size: selectedSize,
                color: color
            };

            await axios.post('/stock-controller', stockData);

            setSelectedProductId(null);
            setSelectedSize('');
            setColor('');
            setStock(false); 
        } catch (error) {
            console.error('Error al añadir el stock:', error);
        }
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <button onClick={()=> setStock(false)}>x</button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <select className="text-black" value={selectedProductId || ''} onChange={handleSelectChange}>
                            <option value="">Selecciona un producto</option>
                            {productos.map(producto => (
                                <option key={producto.id} value={producto.id}>{producto.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className="text-black" value={selectedSize} onChange={handleSizeChange}>
                            <option value="">Selecciona un tamaño</option>
                            <option value='xs'>xs</option>
                            <option value='s'>s</option>
                            <option value='m'>m</option>
                            <option value='l'>l</option>
                            <option value='xl'>xl</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-black" htmlFor="color">Color</label>
                        <input
                            className="text-black"
                            type="text"
                            id="color"
                            name="color"
                            value={color}
                            onChange={handleColorChange}
                            placeholder="Agregar el color de la prenda"
                        />
                    </div>
                    <button type="submit">Añadir Stock</button>
                </form>
            </div>
        </div>
    )
}

export default AgregarStockModal;
