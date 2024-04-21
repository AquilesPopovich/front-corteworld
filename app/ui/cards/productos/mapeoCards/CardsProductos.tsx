'use client'
import React, { useEffect, useState } from 'react';
import CardProducto from '../cardProducto/CardProducto';
import { ProductsList } from '@/app/types/typeProduct';
import axiosURL from '@/axiosConfig/axiosConfig';

interface Props {
  productos: ProductsList;
}

const CardsProductos: React.FC<Props> = ({ productos }) => {
  const [imagenesProductos, setImagenesProductos] = useState<any[]>([]);

  useEffect(() => {
    const obtenerImagenesProductos = async () => {
      const imagenesPromises = productos.map(async (producto) => {
        const { data } = await axiosURL(`/imgProduct/${producto.id}`);
        return { id: producto.id, data: data };
      });
      const imagenes = await Promise.all(imagenesPromises);
      setImagenesProductos(imagenes);
    };

    obtenerImagenesProductos();
  }, [productos]);

  return (
    <div>
      <div className='flex justify-center text-center'>
        <h2 className=' font-bold text-xl mt-10'>Productos destacados</h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {imagenesProductos.map((imagenProducto) => (
          <CardProducto
            key={imagenProducto.id}
            id={imagenProducto.id}
            name={productos.find((producto) => producto.id === imagenProducto.id)?.name || ''}
            imgs={imagenProducto.data}
            mark={productos.find((producto) => producto.id === imagenProducto.id)?.mark || ''}
            price={productos.find((producto) => producto.id === imagenProducto.id)?.price || 0}
            talla={productos.find((producto) => producto.id === imagenProducto.id)?.talla || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsProductos;