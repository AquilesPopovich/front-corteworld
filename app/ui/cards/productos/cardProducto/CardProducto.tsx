'use client'
import React from 'react';

const CardProducto = ({ id, name, img, mark, price, segundaimg }: {id: number, name: string, img: string, mark: string, price: number, segundaimg: string}) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div 
      className="max-w-xs rounded-lg overflow-hidden shadow-md m-4 transition-transform transform hover:scale-105 bg-white flex flex-col justify-between items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
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
      <div className="px-6 pb-4">
        <button className="bg-pink-400 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-md">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default CardProducto;
