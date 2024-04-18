import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaRegClock } from 'react-icons/fa';
import { Menu } from '../../ui/menu/Menu';
import { Footer } from '../../ui/footer/Footer';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import axios from 'axios';

const Historial = () => {

  const {id} = useParams()
  const [carritoRedux, setCarritoRedux] = useState(null)

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const {data} = await axios(`/carrito/${id}`)
        if(data){
          setCarritoRedux(data)
        }
      } catch (error) {
        return error
      }
    }
    fetchData()
  }, [])

  const carrito = [
    {
      userC: { name: 'aquiles' },
      createdAd: '10:10:2024',
      productos: [
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
        }
      ]
    },
    {
      userC: { name: 'Lucas' },
      createdAd: '10:10:2024',
      productos: [
        {
          id: 8,
          img: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/audio_sjyb5v.png',
          segundaimg: 'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
          name: 'Audifonos BlackShark',
          mark: 'Razer',
          price: 450
        }
      ]
    }
  ];

  // Función para calcular el total de la compra
  const calcularTotalCompra = (productos) => {
    return productos.reduce((total, producto) => total + producto.price, 0);
  };

  return (
    <>
      <Menu />
      <div className="container mx-auto mt-8" style={{ marginTop: '110px' }}>

        <div className="flex items-center gap-3 mb-6 mt-32 text-3xl ml-2">
          <FaRegClock />
          <h1 className="font-bold ">Historial de Compras</h1>
        </div>
        {carrito.map((orden, index) => (
          <div className='flex justify-center items-center w-screen'>
          <div key={index} className="grid grid-flow-row border rounded-lg p-4 mb-4 w-11/12 bg-pink-200">
            <div className="flex items-center mb-2">
              <FaShoppingCart className="mr-2" />
              <span>Compra realizada por {orden.userC.name}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {orden.productos.map((producto, idx) => (
                <div key={idx} className="border border-black p-2 flex items-center">
                  <img src={producto.img} alt={producto.name} className="w-12 h-12 rounded-lg mr-2" />
                  <div>
                    <p className="text-lg font-semibold">{producto.name}</p>
                    <p className="text-sm">{producto.mark}</p>
                    <p className="text-lg">${producto.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <FaRegClock className="mr-2" />
                <span className="text-lg">{orden.createdAd}</span>
              </div>
              <div>
                <span className="font-semibold">Total: ${calcularTotalCompra(orden.productos)}</span>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Historial;
