'use client'

import React from 'react'
import CardProducto from '../cardProducto/CardProducto'
import { useAppSelector } from '@/redux/hook'

const CardsProductos = () => {

  // const productos = [
  //     {
  //       id: 1,
  //       img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/teclado_dx8rko.png',
  //       segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //       name: 'Teclado Nyvara',
  //       mark: 'Razer',
  //       price: 120
  //     },
  //     {
  //       id: 2,
  //       img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //       segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/teclado_dx8rko.png',
  //       name: 'Mouse L201',
  //       mark: 'Logitech',
  //       price: 80
  //     },
  //     {
  //       id: 3,
  //       img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708807040/cpu3_fcg4as.png',
  //       segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //       name: 'CPU Gamer',
  //       mark: 'Corsair',
  //       price: 1500
  //     },
  //     {
  //       id: 4,
  //       img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708809448/cropped3_tikrfq.png',
  //       segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //       name: 'Alienware',
  //       mark: 'Dell',
  //       price: 2000
  //     },
  //     {
  //       id: 5,
  //       img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708805538/tarjetagrafica2_sprphn.png',
  //       segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //       name: 'GeForce RTX 3070',
  //       mark: 'Nvidia',
  //       price: 500
  //     },
  //     {
  //       id: 7,
  //       img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708807476/cropped2_bxpo8c.png',
  //       segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //       name: 'Iphone 14 Pro Black',
  //       mark: 'Apple',
  //       price: 3000
  //     },
  //     {
  //       id: 8,
  //       img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/audio_sjyb5v.png',
  //       segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //       name: 'Audifonos BlackShark',
  //       mark: 'Razer',
  //       price: 450
  //     },
  //     {
  //       id: 9,
  //       img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733827/tablet_ts9x4g.png',
  //       segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //       name: 'Ipad Pro',
  //       mark: 'Apple',
  //       price: 1600
  //     }
  // ]

  const productos = useAppSelector(state => state.productsSlice.products);

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