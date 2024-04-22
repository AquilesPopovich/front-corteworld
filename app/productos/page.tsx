'use client'

import React, { useEffect } from 'react'
import { Menu } from '../ui/menu/Menu'
import CardProducto from '../ui/cards/productos/cardProducto/CardProducto'
import { Footer } from '../ui/footer/Footer'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { filterByCategory, getAllProducts } from '@/redux/features/productsSlice'
import { filterByMark, filterByPrice, orderProducts } from '@/redux/features/productsSlice'

const Productos = () => {

  // const productos = [
  //   {
  //     id: 1,
  //     img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/teclado_dx8rko.png',
  //     segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //     name: 'Teclado Nyvara',
  //     mark: 'Razer',
  //     price: 120
  //   },
  //   {
  //     id: 2,
  //     img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //     segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/teclado_dx8rko.png',
  //     name: 'Mouse L201',
  //     mark: 'Logitech',
  //     price: 80
  //   },
  //   {
  //     id: 3,
  //     img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708807040/cpu3_fcg4as.png',
  //     segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //     name: 'CPU Gamer',
  //     mark: 'Corsair',
  //     price: 1500
  //   },
  //   {
  //     id: 4,
  //     img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708809448/cropped3_tikrfq.png',
  //     segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //     name: 'Alienware',
  //     mark: 'Dell',
  //     price: 2000
  //   },
  //   {
  //     id: 5,
  //     img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708805538/tarjetagrafica2_sprphn.png',
  //     segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //     name: 'GeForce RTX 3070',
  //     mark: 'Nvidia',
  //     price: 500
  //   },
  //   {
  //     id: 7,
  //     img: 'https://res.cloudinary.com/diswtvj50/image/upload/v1708807476/cropped2_bxpo8c.png',
  //     segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //     name: 'Iphone 14 Pro Black',
  //     mark: 'Apple',
  //     price: 3000
  //   },
  //   {
  //     id: 8,
  //     img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/audio_sjyb5v.png',
  //     segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //     name: 'Audifonos BlackShark',
  //     mark: 'Razer',
  //     price: 450
  //   },
  //   {
  //     id: 9,
  //     img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733827/tablet_ts9x4g.png',
  //     segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
  //     name: 'Ipad Pro',
  //     mark: 'Apple',
  //     price: 1600
  //   }
  // ]

  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(getAllProducts());
      } catch (error) {
        if(error instanceof Error) throw new Error(error.message);
      }
    }
    fetchData()
  }, [])

  const productos = useAppSelector(state => state.productsSlice.productsForFilter);
  console.log('PRODUCTOS', productos)

  const productosDestacados = productos.filter(producto => producto.destacado === true);
  console.log(productosDestacados)
  
  const markFilter = async(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    try {
      dispatch(filterByMark(event.target.value.toUpperCase()));
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  const priceFilter = async(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    try {
      await dispatch(filterByPrice(Number(event.target.value)));
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  const categoryFilter = async(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    try {
      await dispatch(filterByCategory(event.target.value.toUpperCase()));
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  const handleOrder = async(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    try {
      dispatch(orderProducts(event.target.value.toUpperCase()));
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  return (
    <>
      <Menu />
      <div className="flex" style={{ marginTop: '100px' }}>
        {/* Sección de filtros */}
        <div className="w-1/5 bg-white text-black p-4  h-screen" >
          {/* Botones de filtro */}
          <div className="fixed  top-0 left-0 p-4 w-1/5" style={{ marginTop: '100px' }}>
            <div className="flex  flex-col items-center w-full">
              <select className="bg-pink-500 text-white my-8 px-4 py-2 rounded hover:bg-pink-600 w-9/12"
              onChange={markFilter}
              >
                <option value="">Marca:</option>
                <option value="corteiz">Corteiz</option>
              </select>

              <select className="bg-pink-500 text-white my-10 px-4 py-2 rounded hover:bg-pink-600 w-9/12"
              onChange={priceFilter}
              >
                <option value="">Precio:</option>
                <option value="5600">$5.600</option>
                <option value="43000">$43.000</option>
                <option value="12990">$12.990</option>
                <option value="20990">$20.990</option>
              </select>

              <select className="bg-pink-500 text-white my-10 px-4 py-2 rounded hover:bg-pink-600 w-9/12"
              onChange={categoryFilter}
              >
                <option value="">Category:</option>
                <option value="poleras">Poleras</option>
                <option value="polerones">Polerones</option>
                <option value="pantalones">Pantalones</option>
                <option value="shorts">Shorts</option>
                <option value="gorros">Gorros</option>
              </select>

              <select className="bg-pink-500 text-white my-10 px-4 py-2 rounded hover:bg-pink-600 w-9/12"
              onChange={handleOrder}
              >
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
          {productosDestacados?.map(producto => (
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
      <Footer />
    </>
  )
}

export default Productos