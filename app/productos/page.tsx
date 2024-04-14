import React from 'react'
import { Menu } from '../ui/menu/Menu'
import CardProducto from '../ui/cards/productos/cardProducto/CardProducto'
import { Footer } from '../ui/footer/Footer'

const Productos = () => {

  const productos = [
    {
      id: 1,
      img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/teclado_dx8rko.png',
      segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
      name: 'Teclado Nyvara',
      mark: 'Razer',
      price: 120
    },
    {
      id: 2,
      img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
      segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/teclado_dx8rko.png',
      name: 'Mouse L201',
      mark: 'Logitech',
      price: 80
    },
    {
      id: 3,
      img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708807040/cpu3_fcg4as.png',
      segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
      name: 'CPU Gamer',
      mark: 'Corsair',
      price: 1500
    },
    {
      id: 4,
      img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708809448/cropped3_tikrfq.png',
      segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
      name: 'Alienware',
      mark: 'Dell',
      price: 2000
    },
    {
      id: 5,
      img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708805538/tarjetagrafica2_sprphn.png',
      segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
      name: 'GeForce RTX 3070',
      mark: 'Nvidia',
      price: 500
    },
    {
      id: 7,
      img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708807476/cropped2_bxpo8c.png',
      segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
      name: 'Iphone 14 Pro Black',
      mark: 'Apple',
      price: 3000
    },
    {
      id: 8,
      img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/audio_sjyb5v.png',
      segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
      name: 'Audifonos BlackShark',
      mark: 'Razer',
      price: 450
    },
    {
      id: 9,
      img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733827/tablet_ts9x4g.png',
      segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
      name: 'Ipad Pro',
      mark: 'Apple',
      price: 1600
    }
]

  return (
    <>
      <Menu/>
      <div className="flex" style={{ marginTop: '100px' }}>
        {/* Sección de filtros */}
        <div className="w-1/5 p-4 border-r">
          {/* Botones de filtro */}
          <button className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600 focus:outline-none">Filtro 1</button>
          <button className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600 focus:outline-none">Filtro 2</button>
          <button className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600 focus:outline-none">Filtro 3</button>
          {/* Agrega más botones de filtro según sea necesario */}
        </div>

        {/* Lista de productos */}
        <div className="flex flex-wrap w-4/5 justify-center p-4">
          {productos.map(producto => (
            <CardProducto
              key={producto.id}
              id={producto.id}
              name={producto.name}
              segundaimg={producto.segundaimg}
              img={producto.img}
              mark={producto.mark}
              price={producto.price}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Productos