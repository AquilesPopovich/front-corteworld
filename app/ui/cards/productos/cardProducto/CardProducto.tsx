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
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'

const CardProducto = ({ id, name, mark, price }: { id: string, name: string, mark: string, price: number }) => {
  const [hover, setHover] = React.useState(false);
  const dispatch = useAppDispatch();
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const user = useAppSelector(state => state.userSlice.user);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);


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
    if (!user.length) return   Swal.fire({
      icon: "error",
      title: "Oops... necesitas iniciar sesión para esto",
      text: "Tienes una cuenta?",
      
    });
  ;
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
    if (!user.length) return   Swal.fire({
      icon: "error",
      title: "Oops... necesitas iniciar sesión para esto",
      text: "Tienes una cuenta?",
      
    });
    dispatch(agregarCarrito({
      id, name, imgs, mark, price,
      stock: 1,
      category: '',
      destacado: false,
      discount: 0,
      createdAt: new Date().toISOString(),
      status: false,
    }));
    setAddedToCart(true)
  };

  const deleteProduct = async (id: string) => {
    try {
      const { data } = await axiosURL.patch(`/products/${id}`, { status: false });
      if (data) {
        dispatch(getAllProducts());
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const restaurarProduct = async (id: string) => {
    try {
      const { data } = await axiosURL.patch(`/products/${id}`, { status: true });
      if (data) {
        dispatch(getAllProducts());
      }
    } catch (error) {
      console.error('Error al restaurar el producto:', error);
    }
  };

  const handleUpdateProduct = () => {
    setUpdateProduct(true);
  };

  const destacarProduct = async (id: string) => {
    try {
      const { data } = await axiosURL.patch(`/products/${id}`, { destacado: true });
      if (data) {
        await dispatch(getAllProducts());
      }
    } catch (error) {
      console.error('Error al destacar the product:', error);
    }
  };

  const noDestacarProduct = async (id: string) => {
    try {
      const { data } = await axiosURL.patch(`/products/${id}`, { destacado: false })
      if (data) {
        await dispatch(getAllProducts())
        console.log(data)
      }
    } catch (error) {
      console.error('Error al no destacar the product:', error);
    }
  }

  return (
    <div
      className="max-w-xs rounded-lg overflow-hidden shadow-md m-4 transition-transform transform hover:scale-105 bg-white text-black flex flex-col justify-evenly items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: '300px', maxWidth: '100%', height: '70vh', maxHeight: '100%',          boxShadow: '13px 13px 20px -3px rgba(0, 0, 0, 0.51)',
      WebkitBoxShadow: '13px 13px 20px -3px rgba(0, 0, 0, 0.51)',
      MozBoxShadow: '13px 13px 20px -3px rgba(0, 0, 0, 0.51)', }} // Estilos para el contenedor
    >

      {user[0]?.user?.admin && (
        <Link className=' h-2/4 -mb-16' href={`detail/${id}`}>
          <div key={id} className=" w-full h-80 flex justify-center items-center relative" style={{ width: '100%', height: '80%', maxHeight: '80%' }}> {/* Estilos para la imagen */}
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
          </div>
        </Link>
      )}

      {!user[0]?.user?.admin && (
        <Link className=' h-3/4 -mb-16' href={`detail/${id}`}>
          <div key={id} className=" w-full h-80 flex justify-center items-center relative" style={{ width: '100%', height: '80%', maxHeight: '80%' }}> {/* Estilos para la imagen */}
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
          </div>
        </Link>

      )}

      <div className="absolute top-2 left-0.5"> {/* Posiciona la estrella en la esquina inferior izquierda */}
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
      <div className="px-6 py-2 text-center">
        <div className="font-bold text-black mb-2">{name} ({mark})</div>
        <p className="text-gray-900 font-bold text-lg mt-2">${price}</p>
      </div>

      {user[0]?.user?.admin && (
        <div className='flex flex-col overflow-y-auto w-4/5'>
          <div className="ml-4 flex items-center">
            <button onClick={() => deleteProduct(id)}>Eliminar Producto</button>
          </div>
          <hr className="w-full border-t-2 border-gray-300 my-4" />
          <div className="ml-4 flex items-center">
            <button onClick={() => restaurarProduct(id)}>Restaurar Producto</button>
          </div>
          <hr className="w-full border-t-2 border-gray-300 my-4" />
          <div className="ml-4 flex items-center">
            <button onClick={handleUpdateProduct}>Actualizar Producto</button>
          </div>
          <hr className="w-full border-t-2 border-gray-300 my-4" />
          <div className="ml-4 flex items-center">
            <button onClick={() => destacarProduct(id)}>Destacar Producto</button>
          </div>
          <hr className="w-full border-t-2 border-gray-300 my-4" />
          <div className="ml-4 flex items-center">
            <button onClick={() => noDestacarProduct(id)}>No Destacar Producto</button>
          </div>
          <br />
        </div>
      )}

<div className='pb-4 px-6'>
        {addedToCart ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-green-500 font-bold"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ✓
            </motion.span>
            Producto agregado
          </motion.div>
        ) : (
          <motion.button 
            onClick={handleAgregarCarrito} 
            className="bg-pink-400 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-md"
            whileTap={{ scale: 0.9 }} // Animación al hacer clic
          >
            Agregar al carrito
          </motion.button>
        )}
      </div>
      <UpdateProduct id={id} updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} />
    </div>
  );

};

export default CardProducto;
