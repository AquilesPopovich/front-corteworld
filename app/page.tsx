'use client'

import Carrousel from "./ui/carrousel/Carrousel";
import styles from './landing.module.css';
import dynamic from 'next/dynamic';
import { Footer } from "./ui/footer/Footer";
import { Menu } from './ui/menu/Menu';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllProducts } from "@/redux/features/productsSlice";
import wsp from '../public/images/wsp.png';
import Image from "next/image";
import { agregarToken, eliminarPaymentId, eliminarToken } from "@/redux/features/carritoSlice";
import axiosURL from "@/axiosConfig/axiosConfig";

const CardsProductos = dynamic(() => import('./ui/cards/productos/mapeoCards/CardsProductos'), {
  loading: () =>
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
    </div>,
  ssr: false,
});

export default function Home() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(state => state.productsSlice.productsForFilter);
  const paymentId = useAppSelector(state => state.carritoSlice?.paymentId);
  const token = useAppSelector(state => state.carritoSlice?.token);
  const productosDestacados = allProducts.filter((producto) => producto.destacado === true);
  const productsStatus = productosDestacados.filter((producto) => producto.status === true);
  const params = new URLSearchParams(window.location.search);
  const tokenUrl = params.get('token_ws') || '';
  console.log('IDPAYMENT', paymentId);
  console.log('TOKEN', token);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(agregarToken(tokenUrl));
    const fetchPaymentUpdated = async () => {
      try {
        if (paymentId.length && tokenUrl.length) {
          const { data } = await axiosURL.get(`/payments/accepted/${tokenUrl}/?idPayment=${paymentId}`);
          if (data) console.log(data);
          dispatch(eliminarToken());
          dispatch(eliminarPaymentId());
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };
    fetchPaymentUpdated();
  }, []);

  return (
    <div style={{ marginTop: '100px' }} className='inset-0 h-full w-fit sm:h-full sm:w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ff69b4_100%)]'>
      <Menu />
      <div className={styles.divCategoriasCarrusel}>
        <Carrousel />
      </div>
      <a className="fixed bottom-6 right-7 size-14 hover:scale-150 transition-transform z-30 rounded-full bg-transparent"
        href="https://wa.me/986475277">
        <Image src={wsp} alt="WhatsApp" />
      </a>
      <h2 className='flex justify-center mt-10 font-light text-black font-serif text-6xl'>Productos Destacados</h2>
      {productsStatus && <CardsProductos productos={productsStatus} />}
      <Footer />
    </div>
  );
}
