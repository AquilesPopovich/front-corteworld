'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '@/redux/features/favoriteSlice';
import { agregarCarrito } from '@/redux/features/carritoSlice';
import { Star, StarBorder } from '@mui/icons-material'; 
import { useAppSelector } from '@/redux/hook';
import axiosURL from '@/axiosConfig/axiosConfig';
import { getAllProducts } from '@/redux/features/productsSlice';
import UpdateProduct from '@/app/ui/updateProduct/UpdateProduct';

const CardProducto = ({ id, name, imgs, mark, price }: {id: string, name: string, imgs: string, mark: string, price: number}) => {
  const [hover, setHover] = React.useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const user = useAppSelector(state => state.userSlice.user);
  const [updateProduct, setUpdateProduct] = useState(false);

  const isFavorite = favorites.some((product: any) => product.id === id);

  const handleFavoriteToggle = () => {
    if(!user) alert('Necesitas iniciar sesión para agregar un producto a favoritos');
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
        createdAt: new Date,
        status: false
      }));
    }
  };

  const handleAgregarCarrito = () => {
    if(!user) alert('Necesitas iniciar sesión para agregar un producto al carrito');
    dispatch(agregarCarrito({
      id, name, imgs, mark, price,
      stock: 0,
      category: '',
      destacado: false,
      discount: 0,
      createdAt: new Date,
      status: false
    }));
  };

  const deleteProduct = async (id) =>{
    try {
      const {data} = await axiosURL.delete(`/productos/${id}`); 
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
        dispatch(getAllProducts());
      }
    } catch (error) {
      console.error('Error highlighting the product:', error);
    }
  };
  


  return (
    <div 
      className="max-w-xs rounded-lg overflow-hidden shadow-md m-4 transition-transform transform hover:scale-105 bg-gray-400 flex flex-col justify-between items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href='detail/1'>
        <div key={id} className="bg-gray-200 w-full h-80 flex justify-center items-center relative">
          <img 
            className={`w-full max-h-full object-cover p-2 ${hover ? 'opacity-0' : 'opacity-100'}`} 
            src={imgs} 
            alt={name} 
          />
          {/* <img 
            className={`w-full max-h-full absolute top-0 object-cover p-2 ${hover ? 'opacity-100' : 'opacity-0'} transition-opacity`} 
            src={segundaimg} 
            alt={name} 
          /> */}
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
      {user[0]?.admin && ( 
        <div className="ml-4 flex items-center">
          <button onClick={() => deleteProduct(id)}>Eliminar Producto</button> 
        </div>
      )}
      {user[0]?.admin && ( 
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
      <UpdateProduct id={id} updateProduct={updateProduct} setUpdateProduct={setUpdateProduct}/>
    </div>
  );
};

export default CardProducto;
