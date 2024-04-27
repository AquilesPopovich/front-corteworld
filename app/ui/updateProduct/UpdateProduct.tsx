import React, { useEffect, useState } from 'react';
import styles from '../loggin/loggin.module.css';
import axiosURL from '@/axiosConfig/axiosConfig';
import { getAllProducts } from '@/redux/features/productsSlice';
import { useAppDispatch } from '@/redux/hook';

interface updateProductProps {
  id: string,
  updateProduct: boolean;
  setUpdateProduct: (value: boolean) => void;
}

const UpdateProduct: React.FC<updateProductProps> = ({ id, updateProduct, setUpdateProduct }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    mark: '',
    discount: '',
  });

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosURL(`/products/${id}`)
        if (data) {
          setNuevoProducto(data)
        }
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }
    }
    fetchData()
  }, [])

  const handleChange = (event: any) => {
    setNuevoProducto({
      ...nuevoProducto,
      [event.target.name]: event.target.value
    });
  };
  console.log(nuevoProducto)

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    try {
      const { data } = await axiosURL.patch(`/products/${id}`, nuevoProducto);
      if (data) {
        dispatch(getAllProducts())
        setUpdateProduct(false)
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };


  if (!updateProduct) return null

  return (
    <div className='fixed flex justify-center items-center h-full w-full border-solid rounded-lg bg-slate-50 p-4'>
      <form className='flex flex-col justify-evenly items-center h-full w-full' onSubmit={handleSubmit}>
        <div>
          <label className='flex flex-col font-bold' htmlFor="name">
            Nombre
          </label>
          <input
            className=' border-gray-900 bg-gray-200 border-2 rounded-lg'
            type="text"
            id="name"
            name="name"
            required
            value={nuevoProducto.name}
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <label className='flex flex-col font-bold' htmlFor="price">
            Precio
          </label>
          <input
            className=' border-gray-900 bg-gray-200 border-2 rounded-lg'
            type="number"
            id="price"
            name="price"
            required
            value={nuevoProducto.price}
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <label className='flex flex-col font-bold' htmlFor="category">
            Categoría
          </label>
          <input
            className=' border-gray-900 bg-gray-200 border-2 rounded-lg'
            type="text"
            id="category"
            name="category"
            required
            value={nuevoProducto.category}
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <label className='flex flex-col font-bold' htmlFor="mark">
            Marca
          </label>
          <input
            className=' border-gray-900 bg-gray-200 border-2 rounded-lg'
            type="text"
            id="mark"
            name="mark"
            required
            value={nuevoProducto.mark}
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <label className='flex flex-col font-bold' htmlFor="discount">
            Descuento
          </label>
          <input
            className=' border-gray-900 bg-gray-200 border-2 rounded-lg'
            type="number"
            id="discount"
            name="discount"
            required
            value={nuevoProducto.discount}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row gap-8'>
          <button className=' bg-pink-200 rounded-md hover:bg-pink-400' type="submit">
            Actualizar Producto
          </button>
          <button className=' bg-pink-200 rounded-md hover:bg-pink-400' onClick={() => setUpdateProduct(false)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
