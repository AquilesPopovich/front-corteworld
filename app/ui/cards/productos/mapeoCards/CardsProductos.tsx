import React, { useEffect, useState } from 'react';
import CardProducto from '../cardProducto/CardProducto';
import { ProductsList } from '@/app/types/typeProduct';
import axiosURL from '@/axiosConfig/axiosConfig';
import { useAppSelector } from '@/redux/hook';

interface Props {
  productos: ProductsList;
}

const CardsProductos: React.FC<Props> = ({ productos }) => {

  return (
    <div className=' inset-0 h-full  w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ff69b4_100%)]'>
      <div className='flex justify-center text-center'>
        <h2 className=' font-bold text-xl mt-10'>Productos destacados</h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {productos?.map((imagenProducto) => (
          <CardProducto
            key={imagenProducto.id}
            id={imagenProducto.id}
            name={productos.find((producto) => producto.id === imagenProducto.id)?.name || ''}
            mark={productos.find((producto) => producto.id === imagenProducto.id)?.mark || ''}
            price={productos.find((producto) => producto.id === imagenProducto.id)?.price || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsProductos;
