'use client'
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '@/redux/features/favoriteSlice';
import { Star, StarBorder } from '@mui/icons-material'; // Importa los iconos de estrella vacía y llena

const CardFavoritos = ({ id, name, img, mark, price, segundaimg }: {id: number, name: string, img: string, mark: string, price: number, segundaimg: string}) => {
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
    className='max-w-xs rounded-lg overflow-hidden shadow-md m-4 transition-transform transform hover:scale-105 bg-pink-300 text-black flex flex-col justify-between items-center relative'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href='detail/1'>
        <div key={id} className="bg-gray-200 w-full h-80 flex justify-center items-center relative"> {/* Agrega relative al contenedor de la imagen */}
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
        <div className="font-bold text-xl mb-2">{name} ({mark})</div>
        <p className="text-gray-900 font-bold text-xl mt-2">${price}</p>
      </div>
      <div className='pb-4 px-6'>
        <button className="bg-pink-500 hover:bg-pink-700  text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-md">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default CardFavoritos;
