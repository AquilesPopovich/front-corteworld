'use client'

import React from 'react'
import CardProducto from '../cardProducto/CardProducto'
import { ProductsList } from '@/app/types/typeProduct'

interface Props{
  productos: ProductsList
}

const CardsProductos: React.FC<Props> = ({productos}) => {

  const productosDestacados = productos?.filter(producto => producto.destacado);

  return (
    <div>
      <div className='flex justify-center text-center'>
        <h2 className=' font-bold text-xl mt-10'>Productos destacados</h2>

      </div>
      <div className="flex flex-wrap justify-center">
        {productosDestacados.map(producto => (
          <CardProducto
            key={producto.id}
            id={producto.id}
            name={producto.name}
            // segundaimg={producto.segundaimg}
            imgs={producto.imgs}
            mark={producto.mark}
            price={producto.price}
            talla={producto.talla}
          />
        ))}
      </div>
    </div>
  )
}

export default CardsProductos