'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './carrito.module.css';
import { removeCarrito } from '@/redux/features/carritoSlice';
import axiosURL from '@/axiosConfig/axiosConfig';
import Compra from '../compra/Compra';

interface CarritoProps {
  carrito: boolean;
  setCarrito: (value: boolean) => void;
}

const Carrito: React.FC<CarritoProps> = ({ carrito, setCarrito }) => {
  const [compra, setCompra] = useState(false);
  const [idCompra, setIdCompra] = useState(0)

  const carritoRedux = useSelector((state: any) => state.carritoSlice.carrito);
  const user = useSelector((state: any) => state.userSlice.user);
  const [cantidadProductos, setCantidadProductos] = useState<{ [key: string]: number }>({});
  const [productosRenderizados, setProductosRenderizados] = useState([])
  const productosUnicos = carritoRedux.filter((producto: any, index: any, self: any) =>
    index === self.findIndex((p: any) => p.id === producto.id)
  );
  const [idProductos, setIdProductos] = useState([])

  const dispatch = useDispatch();


  useEffect(() => {
    const ids = carritoRedux.map((producto: any) => producto.id);
    setIdProductos(ids);
  }, [carritoRedux]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (!idProductos.length) return window.alert('No hay productos para comprar!')
      const { data } = await axiosURL.post('/carrito', {
        userId: user[0]?.user?.id,
        productId: idProductos
      })
      if (data) {
        setIdCompra(data.id)
        setCompra(true)
      }
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  const handleCloseCarrito = () => {
    setCarrito(false);
  };

  const calcularPrecioTotal = () => {
    let total = 0;
    carritoRedux.forEach((producto: any) => {
      total += producto.price * (cantidadProductos[producto.id] || 1);
    });
    return total;
  };

  const removeProduct = (id: string) => {
    dispatch(removeCarrito(id));
  };

  const incrementarCantidad = (id: string) => {
    setCantidadProductos({ ...cantidadProductos, [id]: (cantidadProductos[id] || 0) + 1 });
  };

  const decrementarCantidad = (id: string) => {
    if (cantidadProductos[id] && cantidadProductos[id] > 1) {
      setCantidadProductos({ ...cantidadProductos, [id]: cantidadProductos[id] - 1 });
    }
  };

  useEffect(() => {
    const newProductosRenderizados = carritoRedux.map((producto: any) => producto.id);
    setProductosRenderizados(newProductosRenderizados);
  }, [carritoRedux]);

  if (!carrito) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={handleCloseCarrito}></div>
      <div className={styles.container}>
        <span className={styles.close} onClick={handleCloseCarrito}>
          &times;
        </span>
        <h2 className={`text-2xl font-sans ${styles.titulo}`}>Carrito de Compras</h2>
        <div className={` flex flex-col gap-4 ${styles.items}`}>
          {productosUnicos.length ? (
            productosUnicos.map((producto: any) => {
              return (
                <div className={`bg-pink-100 flex ${styles.producto}`} key={producto.id}>
                  <img src={producto.imgs[0]} alt={producto.name} />
                  <div className={`flex justify-evenly items-start w-full ${styles.objetos}`}>
                    <h3>{producto.name}</h3>
                    <p>{producto.mark}</p>
                    <p>Precio: ${producto.price}</p>
                    <div className='text-2xl'>
                      <button className='text-black hover:text-pink-500 transition-colors' onClick={() => decrementarCantidad(producto.id)}> - </button>
                      <span> {cantidadProductos[producto.id] || 1} </span>
                      <button className='text-black hover:text-pink-500 transition-colors' onClick={() => incrementarCantidad(producto.id)}> + </button>
                    </div>
                    <button className=' rounded-lg bg-pink-300 hover:bg-pink-500 transition-colors' onClick={() => removeProduct(producto.id)}>Eliminar</button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className=' text-lg text-slate-500'>No hay productos en el carrito.</p>
          )
          }
        </div>
        <div className={styles.totalPrice}>Precio Total: ${calcularPrecioTotal()}</div>
        <button className={styles.checkout} onClick={handleClick}>Realizar Pedido</button>
      </div>
      <Compra compra={compra} setCompra={setCompra} productos={carritoRedux} idCompra={idCompra} setIdCompra={setIdCompra} setCarrito={setCarrito} />
    </div>
  );
};


export default Carrito;
