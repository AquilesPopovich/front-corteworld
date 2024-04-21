'use client'

import Carrousel from "./ui/carrousel/Carrousel";
import styles from './landing.module.css'
import CardsProductos from "./ui/cards/productos/mapeoCards/CardsProductos";
import { Footer } from "./ui/footer/Footer";
import { Menu } from './ui/menu/Menu';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllProducts } from "@/redux/features/productsSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(state => state.productsSlice.products);

  useEffect(() => {
        dispatch(getAllProducts());
  }, [])

  return (
    <div style={{ marginTop: '100px' }}>
      <Menu />
      <div className={styles.divCategoriasCarrusel}>
        <Carrousel />
      </div>
      {allProducts && <CardsProductos productos={allProducts}/>}
      <Footer />
    </div>
  );
}
