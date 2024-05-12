import { ProductsList } from "@/app/types/typeProduct";
import { useState } from "react";
import styles from './stock.module.css';
import axiosURL from "@/axiosConfig/axiosConfig";

interface Props {
    stock: boolean;
    setStock: (value: boolean) => void;
    productos: ProductsList;
}

const AgregarStockModal: React.FC<Props> = ({ stock, setStock, productos }) => {

    const [newStock, setNewStock] = useState({
        productId: '',
        talla: '',
        color: '',
        stock: 0
    })

    if (!stock) return null

    const handleChange = async (event: any) => {
        setNewStock({
            ...newStock,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { data } = await axiosURL.post('/stock-controller', newStock);
            if (data) {
                console.log('Stock creado:', data);
            }
            setNewStock({
                productId: '',
                talla: '',
                color: '',
                stock: 0
            })
            window.alert('Stock añadido a prenda!')
        } catch (error) {
            console.error('Error al añadir el stock:', error);
        }
    };

    return (
        <div className={`fixed flex justify-start items-center h-3/4 w-3/6 left-1/4 bottom-10 border-solid rounded-lg bg-slate-50 p-4 ${styles.container}`}>
            <form className={`flex flex-col justify-evenly items-start h-full w-full ${styles.form}`} onSubmit={handleSubmit}>
                <div className={`text-black text-xl flex flex-col gap-2 ${styles.select}`}>
                    <h1 className="font-bold">Producto: </h1>

                    <select className={`text-black ${styles.selectW}`} name='productId' id="name" onChange={handleChange}>
                        <option value="">Selecciona un producto</option>
                        {productos.map(producto => (
                            <option key={producto.id} value={producto.id}>{producto.name}</option>
                        ))}
                    </select>
                </div>
                <div className={`text-black text-xl flex flex-col gap-2 ${styles.select}`}>
                    <h1 className="font-bold">Talla: </h1>
                    <select className={`text-black ${styles.selectW}`} name="talla" value={newStock.talla} onChange={handleChange}>
                        <option value="">Selecciona una Talla:</option>
                        <option value='xs'>XS</option>
                        <option value='s'>S</option>
                        <option value='m'>M</option>
                        <option value='l'>L</option>
                        <option value='xl'>XL</option>
                    </select>
                </div>
                <div>
                    <label className={`flex flex-col font-bold text-xl ${styles.label}`} htmlFor="color">Color</label>
                    <input
                        className={` border-gray-900 bg-gray-200 border-2 rounded-lg ${styles.input}`}
                        type="text"
                        id="color"
                        name="color"
                        value={newStock.color}
                        onChange={handleChange}
                        placeholder="Color de la prenda"
                    />
                </div>
                <div>
                    <label className={`flex flex-col font-bold text-xl ${styles.label}`}  htmlFor="stock">Stock</label>
                    <input
                        className={` border-gray-900 bg-gray-200 border-2 rounded-lg ${styles.input}`}
                        type="text"
                        id="stock"
                        name="stock"
                        value={newStock.stock}
                        onChange={handleChange}
                        placeholder="N° de Stock"
                    />
                </div>
                <div className="flex gap-8">
                <button className={`bg-pink-200 rounded-md hover:bg-pink-400 ${styles.buttons}`} type="submit">Añadir Stock</button>
                <button className={`bg-pink-200 rounded-md hover:bg-pink-400 ${styles.buttons}`}onClick={() => setStock(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default AgregarStockModal;
