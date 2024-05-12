'use client'
import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaRegClock } from 'react-icons/fa';
import { Menu } from '../../ui/menu/Menu';
import { Footer } from '../../ui/footer/Footer';
import { useParams } from 'next/navigation';
import axiosURL from '@/axiosConfig/axiosConfig';
import Image from 'next/image';
import wsp from '../../../public/images/wsp.png'
import styles from '../historial.module.css';

const Historial = () => {
  const { id } = useParams();
  const [carrito, setCarrito] = useState([]);
  const [imgs, setImgs] = useState<any[]>([]);
  const [carritoPaymentCompleted, setCarritoPaymentCompleted] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosURL(`/carrito/user/${id}`);
        if (data) {
          setCarrito(data);
          const imgPromises = data.flatMap((orden: any) =>
            orden?.productos?.map(async (producto: any) => {
              const { data: imgData } = await axiosURL(`/imgProduct/${producto.id}`);
              return imgData;
            })
          );
          const imgResponses = await Promise.all(imgPromises);
          setImgs(imgResponses);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataPayment = async (): Promise<void> => {
      try {
        const carritos = carrito.map(async (carro) => {
          const { data } = await axiosURL.get(`/payments/carrito/${carro.id}`);
          console.log(data)
          if (data && data.status === 'DONE') {
            return carro;
          } else if (data.status === 'FAILED') {
            const response = await axiosURL.delete(`/payments/${data.id}`);
            if (response) console.log(response);
          }
          return null;
        });
        const carritosCompletados = await Promise.all(carritos);
        const filteredCarritos = carritosCompletados.filter(carro => carro !== null);
        setCarritoPaymentCompleted(filteredCarritos);
      } catch (error) {
        if (error instanceof Error) console.error('Error fetching data:', error.message);
      }
    };
    fetchDataPayment();
  }, [carrito]);

  const calcularTotalCompra = (productos: Array<object>) => {
    return productos.reduce((total, producto) => total + producto.price, 0);
  };

  return (
    <>
      <Menu />
      <div className="mt-10">
        <div className="container mx-auto pt-24 pb-8">
          <div className="flex text-black items-center gap-3 text-3xl ml-2 mb-10">
            <FaRegClock />
            <h1 className="font-bold text-5xl font-serif text-black mb-6">Historial de Compras</h1>
          </div>
          {!carritoPaymentCompleted.length ? (
            <h1 className={`text-3xl flex justify-center items-center text-black font-serif ${styles.noProducts}`}>No hay productos comprados</h1>
          ) : (
            carritoPaymentCompleted?.map((orden, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full md:w-3/4">
                  <div className="bg-white text-black border rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <FaShoppingCart className="mr-2" />
                      <span>Compra realizada por {orden?.userC?.name}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {orden?.productos?.map((producto, idx) => (
                        <div key={idx} className="bg-pink-100 border border-black p-2 flex flex-wrap items-center">
                          {imgs?.map((img) => {
                            if (img?.[0].product?.id === producto?.id) {
                              return (
                                <img src={img?.[0].file} alt={producto?.name} className="w-12 h-12 rounded-lg mr-2" />
                              )
                            }
                          })}
                          <div className={styles.productContainer}>
                            <p className="text-lg font-semibold">{producto?.name}</p>
                            <p className="text-sm">{producto?.mark}</p>
                            <p className="text-lg">${producto?.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      <div>
                        <FaRegClock className="mr-2" />Fecha:{" "}
                        <span className="text-lg">
                          {new Date(orden?.createdAt).toLocaleString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Total: ${calcularTotalCompra(orden?.productos)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <a className="fixed bottom-6 right-5 size-14 hover:scale-150 transition-transform z-30 rounded-full bg-transparent"
        href="https://wa.me/986475277">
        <Image src={wsp} alt="WhatsApp" />
      </a>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Historial;
