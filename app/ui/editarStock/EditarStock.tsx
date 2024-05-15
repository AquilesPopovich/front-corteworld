import axiosURL from '@/axiosConfig/axiosConfig';
import React, { useState } from 'react'


interface Props {
    editarStock: boolean;
    setEditarStock: (value: boolean) => void;
    idStock: string
    idProducto: string
}

const EditarStock: React.FC<Props> = ({editarStock, setEditarStock, idStock, idProducto}) => {

    const [newStock, setNewStock] = useState({
        productId: idProducto,

        talla: '',
        color: '',
        stock: 0
    })

    const handleChange = async (event: any) => {
        setNewStock({
            ...newStock,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { data } = await axiosURL.patch(`/stock-controller/${idStock}`, newStock);
            if (data) {
                console.log('Stock creado:', data);
            }
            setNewStock({
        productId: idProducto,
                talla: '',
                color: '',
                stock: 0
            })
        } catch (error) {
            console.error('Error al añadir el stock:', error);
        }
    };


    if(!editarStock) return null

  return (
    <div className='fixed flex justify-start items-center h-3/4 w-3/6 left-1/4 bottom-10 border-solid rounded-lg bg-slate-50 p-4'>
            <form className='flex flex-col justify-evenly items-start h-full w-full' onSubmit={handleSubmit}>
                <div className="text-black text-xl flex flex-col gap-2 ">
                    <h1 className="font-bold">Talla: </h1>
                    <select className="text-black" name="talla" value={newStock.talla} onChange={handleChange}>
                        <option value="">Selecciona una Talla:</option>
                        <option value='xs'>XS</option>
                        <option value='s'>S</option>
                        <option value='m'>M</option>
                        <option value='l'>L</option>
                        <option value='xl'>XL</option>
                    </select>
                </div>
                <div>
                    <label className='flex flex-col font-bold text-xl' htmlFor="color">Color</label>
                    <input
                        className=' border-gray-900 bg-gray-200 border-2 rounded-lg'
                        type="text"
                        id="color"
                        name="color"
                        value={newStock.color}
                        onChange={handleChange}
                        placeholder="Color de la prenda"
                    />
                </div>
                <div>
                    <label className='flex flex-col font-bold text-xl'  htmlFor="stock">Stock</label>
                    <input
                        className=' border-gray-900 bg-gray-200 border-2 rounded-lg'
                        type="text"
                        id="stock"
                        name="stock"
                        value={newStock.stock}
                        onChange={handleChange}
                        placeholder="N° de Stock"
                    />
                </div>
                <div className="flex gap-8">
                <button className=' bg-pink-200 rounded-md hover:bg-pink-400' type="submit">Update Stock</button>
                <button className=' bg-pink-200 rounded-md hover:bg-pink-400' onClick={() => setEditarStock(false)}>Cancelar</button>
                </div>
            </form>
        </div>
  )
}

export default EditarStock