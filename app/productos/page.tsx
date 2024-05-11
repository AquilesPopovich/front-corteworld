'use client'

import React, { useEffect } from 'react'
import { Menu } from '../ui/menu/Menu'
import CardProducto from '../ui/cards/productos/cardProducto/CardProducto'
import { Footer } from '../ui/footer/Footer'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { filterByCategory, getAllProducts } from '@/redux/features/productsSlice'
import { filterByMark, orderProducts } from '@/redux/features/productsSlice'
import wsp from '../../public/images/wsp.png'
import Image from "next/image";
import styles from './productos.module.css';

const Productos = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(getAllProducts());
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    }
    fetchData()
  }, [])

  const productos = useAppSelector(state => state.productsSlice.productsForFilter);
  const productsStatus = productos.filter((producto) => producto.status === true);
  console.log('PRODUCTOS', productos)


  const markFilter = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    try {
      dispatch(filterByMark(event.target.value.toUpperCase()));
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  const categoryFilter = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    try {
      await dispatch(filterByCategory(event.target.value.toUpperCase()));
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  const handleOrder = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    try {
      dispatch(orderProducts(event.target.value));
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  return (
    <>
      <Menu />
      <div className="flex flex-col justify-between " style={{ marginTop: '100px' }}>
        <div className={`mr-14 ${styles.container}`}>
          <div className={`fixed top-auto left-0 w-1/5 bg-white rounded-md text-black ${styles.bg}`} >
            <div className={`flex flex-col items-center justify-stretch h-screen ${styles.filtros}`}>
              <select className="bg-pink-500 text-white my-8 px-4 py-2 rounded hover:bg-pink-600 w-9/12 z-50"
                onChange={markFilter}
              >
                <option value="">Marca:</option>
                <option value="corteiz">Corteiz</option>
                <option value="trapstar">TrapStar</option>
                <option value="syna">Syna</option>
              </select>

              <select className="bg-pink-500 text-white my-10 px-4 py-2 rounded hover:bg-pink-600 w-9/12"
                onChange={handleOrder}
              >
                <option value="">Precio:</option>
                <option value="A-Price">Precios de menor a mayor</option>
                <option value="D-Price">Precios de mayor a menor</option>
              </select>

              <select className="bg-pink-500 text-white my-10 px-4 py-2 rounded hover:bg-pink-600 w-9/12"
                onChange={categoryFilter}
              >
                <option value="">Category:</option>
                <option value="poleras">Poleras</option>
                <option value="polerones">Polerones</option>
                <option value="pantalones">Pantalones</option>
                <option value="acc">Accesorios</option>
              </select>

              <select className="bg-pink-500 text-white my-10 px-4 py-2 rounded hover:bg-pink-600 w-9/12"
                onChange={handleOrder}
              >
                <option value="">Ordenar por:</option>
                <option value="A-Name">Nombres A - Z</option>
                <option value="D-Name">Nombres Z - A</option>
                <option value="A-Date">Productos antiguos</option>
                <option value="D-Date">Productos nuevos</option>
              </select>
            </div>
          </div>

          <div className={`flex flex-row-reverse flex-wrap justify-start w-4/5 ml-60 p-4 mb-96 ${styles.products}`}>
            {productsStatus?.map(producto => (
              <CardProducto
                key={producto.id}
                id={producto.id}
                name={producto.name}
                mark={producto.mark}
                price={producto.price}
              />
            ))}
          </div>
          <a className="fixed bottom-6 right-5 size-14 hover:scale-150 transition-transform z-30 rounded-full bg-transparent"
            href="https://wa.me/986475277">
            <Image src={wsp} alt="WhatsApp" />
          </a>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Productos