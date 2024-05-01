'use client'

import Carrousel from "./ui/carrousel/Carrousel";
import styles from './landing.module.css'
import CardsProductos from "./ui/cards/productos/mapeoCards/CardsProductos";
import { Footer } from "./ui/footer/Footer";
import { Menu } from './ui/menu/Menu';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllProducts } from "@/redux/features/productsSlice";
import wsp from '../public/images/wsp.png'
import Image from "next/image";

export default function Home() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(state => state.productsSlice.productsForFilter);
  const productosDestacados = allProducts.filter((producto) => producto.destacado === true);
  const productsStatus = productosDestacados.filter((producto) => producto.status === true);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [])

  return (
    <div style={{ marginTop: '100px' }} className=' inset-0 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ff69b4_100%)]'>
      <Menu />
      <div className={styles.divCategoriasCarrusel}>
        <Carrousel />
      </div>
        <a className="fixed bottom-6 right-5 size-14 hover:scale-150 transition-transform z-30 rounded-full bg-transparent" 
        href="https://wa.me/986475277">
          <Image src={wsp} alt="WhatsApp" />
        </a>
        <h2 className='flex justify-center mt-10 font-light text-black font-serif text-6xl'>Productos Destacados</h2>
      {productsStatus && <CardsProductos productos={productsStatus} />}
      <Footer />
    </div>
  );
}
