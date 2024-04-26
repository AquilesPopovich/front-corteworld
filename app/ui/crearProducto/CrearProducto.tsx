'use client'
import React, { useState } from 'react';
import styles from './crearProducto.module.css';
import axiosURL from '@/axiosConfig/axiosConfig';

interface crearProductoProps {
  crearProducto: boolean;
  setCrearProducto: (value: boolean) => void;
}

const CrearProducto: React.FC<crearProductoProps> = ({ crearProducto, setCrearProducto }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    price: 0,
    destacado: Boolean,
    category: '',
    mark: '',
    discount: 0
  });

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (event: any) => {
    let { name, value } = event.target;
    if (name === 'destacado') {
      value = Boolean(Number(value));
    }
    setNuevoProducto({
      ...nuevoProducto,
      [name]: value
    });
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
      const { data } = await axiosURL.post('/products', nuevoProducto);
      if (data) {
        console.log('Producto creado:', data);
        setNuevoProducto({
          name: '',
          price: 0,
          destacado: Boolean,
          category: '',
          mark: '',
          discount: 0
        });
        setCrearProducto(false)
        window.alert('PRODUCTO CREADO')
      }
  
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        const cloudinaryResponse = await axiosURL.post(`/imgProduct/upload/${data.id}`, formData);
        console.log(cloudinaryResponse.data); 
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };
  

  if (!crearProducto) return null;

  return (
    <div className='fixed flex justify-start items-center h-3/4 w-3/6 left-1/4 bottom-10 border-solid rounded-lg bg-slate-50 p-4'>
        <form className='flex flex-col justify-evenly items-start h-full w-full' onSubmit={handleSubmit}>
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
            <label className='flex flex-col font-bold' htmlFor="destacado">
              Destacado
            </label>
            <input
              className=' border-gray-900 bg-gray-200 border-2 rounded-lg'
              type="number"
              id="destacado"
              name="destacado"
              required
              value={Number(nuevoProducto.destacado)}
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
          <div className='flex flex-row font-bold justify-evenly gap-7'>
            <label htmlFor="imgs">Buscar Archivo</label>
            <input type="file" onChange={handleFileChange} />
            {imagePreview && (
              <img className=''
                src={imagePreview}
                alt="Preview"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
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
            Crear Producto
          </button>
          <button className=' bg-pink-200 rounded-md hover:bg-pink-400' onClick={()=> setCrearProducto(false)}>Cancelar</button>
          </div>
        </form>
    </div>
  );
};

export default CrearProducto;
