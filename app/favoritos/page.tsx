'use client'
import React from 'react'
import { useSelector } from 'react-redux';
import { Menu } from '../ui/menu/Menu';
import { Footer } from '../ui/footer/Footer';
import CardFavoritos from '../ui/cardFavoritos/CardFavoritos';
import Image from 'next/image';
import wsp from '../../public/images/wsp.png'
import dynamic from 'next/dynamic';

const Favoritos = () => {

  const favorites = useSelector((state: any) => state.favorites.favorites);

  if (!favorites.length) {
    const CardsProductos = dynamic(() => import('../ui/cards/productos/mapeoCards/CardsProductos'), {
      loading: () => (
        <div className="w-fit h-full flex flex-wrap items-center justify-center">
          {[...Array(6).keys()].map((i) => (
            <div
              key={i}
              className="max-w-xs rounded-lg overflow-hidden shadow-md m-4 transition-transform transform hover:scale-105 bg-white text-black flex flex-col justify-start items-center"
              style={{
                width: '300px',
                maxWidth: '100%',
                height: '70vh',
                maxHeight: '100%',
                boxShadow: '13px 13px 20px -3px rgba(0, 0, 0, 0.51)',
                WebkitBoxShadow: '13px 13px 20px -3px rgba(0, 0, 0, 0.51)',
                MozBoxShadow: '13px 13px 20px -3px rgba(0, 0, 0, 0.51)',
              }}
            >
              <div className="relative w-2/3 h-56 bg-gray-200 mt-4 overflow-hidden">
              </div>
              <div className="relative w-1/2 h-4 bg-gray-200 mt-4 overflow-hidden">
              </div>
              <div className="relative w-1/3 h-4 bg-gray-200 mt-2 overflow-hidden">
              </div>
              <div className="relative w-2/3 px-6 py-3 bg-gray-200 mt-32 overflow-hidden">
              </div>
            </div>
          ))}
        </div>
      ),
      ssr: false,
    });
    return <CardsProductos />;
  }

  if(favorites.length){
    return (
      <div className="flex flex-col min-h-screen">
        <Menu />
        <div className='flex flex-col items-center mt-36 flex-grow'>
          <h2 className=' font-light text-black font-serif text-6xl'>Productos Favoritos</h2>
          <div className='flex flex-wrap justify-center mt-12'>
            {favorites.length > 0 ? (
              favorites.map((product: any) => (
                <div key={product.id} className="p-2 m-4">
                  <CardFavoritos
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
        <a className="fixed bottom-6 right-5 size-14 hover:scale-150 transition-transform z-30 rounded-full bg-transparent" 
        href="https://wa.me/986475277">
          <Image src={wsp} alt="WhatsApp" />
        </a>
        <Footer />
      </div>
    )
  }
   
  
}

export default Favoritos
