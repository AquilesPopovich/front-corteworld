'use client'
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '@/redux/features/favoriteSlice';

const CardProducto = ({ id, name, img, mark, price, segundaimg }: {id: number, name: string, img: string, mark: string, price: number, segundaimg: string}) => {
  const [hover, setHover] = React.useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.favorites);

  const isFavorite = favorites.some((product: any) => product.id === id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      // Aquí puedes enviar el producto completo en lugar de solo el ID si lo prefieres
      dispatch(addFavorite({ id, name, img, mark, price, segundaimg }));
    }
  };

  return (
    <div 
      className="max-w-xs rounded-lg overflow-hidden shadow-md m-4 transition-transform transform hover:scale-105 bg-white flex flex-col justify-between items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href='detail/1'>
      <div key={id} className="bg-gray-200 w-full h-80 flex justify-center items-center">
        <img 
          className={`w-full max-h-full object-cover p-2 ${hover ? 'opacity-0' : 'opacity-100'}`} 
          src={img} 
          alt={name} 
        />
        <img 
          className={`w-full max-h-full absolute top-0 object-cover p-2 ${hover ? 'opacity-100' : 'opacity-0'} transition-opacity`} 
          src={segundaimg} 
          alt={name} 
        />
      </div>
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{name} ({mark})</div>
        <p className="text-gray-900 font-bold text-xl mt-2">${price}</p>
      </div>
      </Link>
      <button className="bg-pink-400 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-md">
          Agregar al carrito
        </button>

      <div className="px-6 pb-4">
        <button onClick={handleFavoriteToggle} className={`bg-transparent hover:bg-pink-700 text-pink-400 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-md ${isFavorite ? 'text-pink-700' : ''}`}>
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      </div>
    </div>
  );
};

export default CardProducto;
