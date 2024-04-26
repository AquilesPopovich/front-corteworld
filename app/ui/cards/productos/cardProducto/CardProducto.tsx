'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '@/redux/features/favoriteSlice';
import { agregarCarrito } from '@/redux/features/carritoSlice';
import { Star, StarBorder } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import axiosURL from '@/axiosConfig/axiosConfig';
import { getAllProducts } from '@/redux/features/productsSlice';
import UpdateProduct from '@/app/ui/updateProduct/UpdateProduct';

const CardProducto = ({ id, name, mark, price }: { id: string, name: string, mark: string, price: number }) => {
  const [hover, setHover] = React.useState(false);
  const dispatch = useAppDispatch();
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const user = useAppSelector(state => state.userSlice.user);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosURL.get(`/imgProduct/${id}`)
        if (data) setImgs(data.map((img: any) => img.file));
      } catch (error) {
        console.error('Error al traer imagenes:', error);
      }
    }
    fetchData();
  }, [])

 


  const isFavorite = favorites.some((product: any) => product.id === id);

  const handleFavoriteToggle = () => {
    if (!user.length) return alert('Necesitas iniciar sesión para agregar un producto a favoritos');
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      // Aquí puedes enviar el producto completo en lugar de solo el ID si lo prefieres
      dispatch(addFavorite({
        id, name, imgs, mark, price,
        stock: 0,
        category: '',
        destacado: false,
        discount: 0,
        createdAt: new Date().toISOString(),
        status: false,
      }));
    }
  };

  const handleAgregarCarrito = () => {
    if (!user.length) return alert('Necesitas iniciar sesión para agregar un producto al carrito');
    dispatch(agregarCarrito({
      id, name, imgs, mark, price,
      stock: 1,
      category: '',
      destacado: false,
      discount: 0,
      createdAt: new Date().toISOString(),
      status: false,
    }));
  };

  const deleteProduct = async (id: string) => {
    try {
      const { data } = await axiosURL.delete(`/productos/${id}`);
      if (data) {
        dispatch(getAllProducts());
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleUpdateProduct = () => {
    setUpdateProduct(true);
  };

  const destacarProduct = async (id: string) => {
    try {
      const { data } = await axiosURL.patch(`/productos/${id}`, { destacado: true });
      if (data) {
        await dispatch(getAllProducts());
      }
    } catch (error) {
      console.error('Error highlighting the product:', error);
    }
  };

  return (
    <div
      className="max-w-xs rounded-lg overflow-hidden shadow-md m-4 transition-transform transform hover:scale-105 bg-white text-black flex flex-col justify-between items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: '300px', maxWidth: '100%', height: '400px', maxHeight: '100%' }} // Estilos para el contenedor
    >
      <Link href={`detail/${id}`}>
        <div key={id} className="bg-gray-100 w-full h-80 flex justify-center items-center relative" style={{ width: '100%', height: '80%', maxHeight: '80%' }}> {/* Estilos para la imagen */}
          <img
            className={`w-full h-full object-cover p-2 ${hover ? 'opacity-0' : 'opacity-100'}`}
            src={imgs[0]} 
            alt={name}
          />
          <img 
            className={`w-full h-full absolute top-0 object-cover p-2 ${hover ? 'opacity-100' : 'opacity-0'} transition-opacity`} 
            src={imgs[1]} 
            alt={name} 
          />
          <div className="absolute bottom-2 left-2"> {/* Posiciona la estrella en la esquina inferior izquierda */}
            {/* Reemplaza el botón con los iconos de estrella */}
            {isFavorite ? (
              <Star
                onClick={handleFavoriteToggle}
                className="text-pink-700 cursor-pointer"
                style={{ fontSize: '2rem' }}
              />
            ) : (
              <StarBorder
                onClick={handleFavoriteToggle}
                className="text-pink-400 cursor-pointer"
                style={{ fontSize: '2rem' }}
              />
            )}
          </div>
        </div>
      </Link>
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl text-black mb-2">{name} ({mark})</div>
        <p className="text-gray-900 font-bold text-xl mt-2">${price}</p>
      </div>
      {user[0]?.user?.admin && (
        <div className="ml-4 flex items-center">
          <button onClick={() => deleteProduct(id)}>Eliminar Producto</button>
        </div>
      )}
      {user[0]?.user?.admin && (
        <div className="ml-4 flex items-center">
          <button onClick={handleUpdateProduct}>Actualizar Producto</button>
        </div>
      )}
      <div className="ml-4 flex items-center">
        <button onClick={() => destacarProduct(id)}>Destacar Product</button>
      </div>

      <div className='pb-4 px-6'>
        <button onClick={handleAgregarCarrito} className="bg-pink-400 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-md">
          Agregar al carrito
        </button>
      </div>
      <UpdateProduct id={id} updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} />
    </div>
);

};

export default CardProducto;
