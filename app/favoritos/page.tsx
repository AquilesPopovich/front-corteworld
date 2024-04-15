'use client'
import React from 'react'
import { useSelector } from 'react-redux';
import CardProducto from '../ui/cards/productos/cardProducto/CardProducto';
import { Menu } from '../ui/menu/Menu';
import { Footer } from '../ui/footer/Footer';

const Favoritos = () => {

  const favorites = useSelector((state: any) => state.favorites.favorites);

  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <div className='flex flex-col items-center mt-36 flex-grow'>
        <h2 className=' font-light text-6xl'>Productos Favoritos</h2>
        <div className='flex flex-wrap justify-center mt-12'>
          {favorites.length > 0 ? (
            favorites.map((product: any) => (
              <div key={product.id} className="p-2 m-4">
                <CardProducto
                  id={product.id}
                  name={product.name}
                  segundaimg={product.segundaimg}
                  img={product.img}
                  mark={product.mark}
                  price={product.price}
                />
              </div>
            ))
          ) : (
            <p className='text-2xl'>No hay productos favoritos.</p>
          )}
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Favoritos
