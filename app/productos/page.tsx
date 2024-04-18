'use client'

import React, { useEffect, useState } from 'react'
import { Menu } from '../ui/menu/Menu'
import CardProducto from '../ui/cards/productos/cardProducto/CardProducto'
import { Footer } from '../ui/footer/Footer'
import { useAppDispatch } from '@/redux/hook'
// import { filterByMark, filterByPrice, getProducts, orderByDate, orderByName, orderByPrice, orderProducts } from '@/redux/features/productsSlice'

const Productos = () => {

  const [productosRedux, setProductosRedux] = useState(null)

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productos = dispatch(getProducts)
        if (productos) setProductosRedux(productos)
      } catch (error) {

      }
    }
    fetchData()
  }, [])

  // const markFilter = async(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
  //   try {
  //     dispatch(filterByMark(event.target.value, products));
  //   } catch (error) {
  //     if (error instanceof Error) throw Error(error.message)
  //   }
  // }

  // const priceFilter = async(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
  //   try {
  //     dispatch(filterByPrice(event.target.value, products));
  //   } catch (error) {
  //     if (error instanceof Error) throw Error(error.message)
  //   }
  // }

  // const handleOrder = async(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
  //   try {
  //     if(event.target.value === 'A-Name') dispatch(orderProducts('A-Name', products));
  //     else if(event.target.value === 'D-Name') dispatch(orderProducts('D-Name', products));
  //     else if(event.target.value === 'A-Price') dispatch(orderProducts('A-Price', products));
  //     else if(event.target.value === 'D-Price') dispatch(orderProducts('D-Price', products));
  //     else if(event.target.value === 'A-Date') dispatch(orderProducts('A-Date', products));
  //     else if(event.target.value === 'D-Date') dispatch(orderProducts('D-Date', products));
  //   } catch (error) {
  //     if (error instanceof Error) throw Error(error.message)
  //   }
  // }

  return (
    <>
      <Menu />
      <div className="flex" style={{ marginTop: '100px' }}>
        {/* Sección de filtros */}
        <div className="w-1/5 p-4 border-r">
          {/* Botones de filtro */}
          <div className="fixed top-0 left-0 p-4 w-1/5" style={{ marginTop: '100px' }}>
            <div className="flex flex-col items-center gap-4 w-full">
              <select className="bg-pink-500 text-white my-8 px-4 py-2 rounded hover:bg-pink-600 focus:outline-none w-9/12">
                <option value="">Marca:</option>
                <option value="razer">Razer</option>
                <option value="apple">Apple</option>
                <option value="logitech">Logitech</option>
                <option value="corsair">Corsair</option>
                <option value="dell">Dell</option>
                <option value="nvidia">Nvidia</option>
              </select>

              <select className="bg-pink-500 text-white my-10 px-4 py-2 rounded hover:bg-pink-600 focus:outline-none w-9/12">
                <option value="">Precio:</option>
                <option value="5990">$5.990</option>
                <option value="9990">$9.990</option>
                <option value="12990">$12.990</option>
                <option value="20990">$20.990</option>
              </select>

              <select className="bg-pink-500 text-white my-10 px-4 py-2 rounded hover:bg-pink-600 focus:outline-none w-9/12">
                <option value="">Ordenar por:</option>
                <option value="A-Name">Nombres A - Z</option>
                <option value="D-Name">Nombres Z - A</option>
                <option value="A-Price">Precios de menor a mayor</option>
                <option value="D-Price">Precios de mayor a menor</option>
                <option value="A-Date">Productos antiguos</option>
                <option value="D-Date">Productos nuevos</option>
              </select>
            </div>
          </div>
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
      <Footer />
    </>
  )
}

export default Productos