'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './carrito.module.css';
import { removeCarrito } from '@/redux/features/carritoSlice';

interface CarritoProps {
  carrito: boolean;
  setCarrito: (value: boolean) => void;
}

const Carrito: React.FC<CarritoProps> = ({ carrito, setCarrito }) => {
  const carritoRedux = useSelector((state: any) => state.carritoSlice.carrito);
  const [cantidadProductos, setCantidadProductos] = useState<{ [key: string]: number }>({});
  const productosUnicos = carritoRedux.filter((producto, index, self) =>
    index === self.findIndex((p) => p.id === producto.id)
  );
  const dispatch = useDispatch();
  

  
  
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

  if (!carrito) return null;


  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={handleCloseCarrito}></div>
      <div className={styles.container}>
        <span className={styles.close} onClick={handleCloseCarrito}>
          &times;
        </span>
        <h2>Carrito de Compras</h2>
        <div className={styles.items}>
          {productosUnicos.map((producto: any) => {

            return (
              <div className={styles.producto} key={producto.id}>
                <img src={producto.img} alt={producto.name} />
                <div>
                  <h3>{producto.name}</h3>
                  <p>{producto.mark}</p>
                  <p>Precio: ${producto.price}</p>
                  <div>
                    <button onClick={() => decrementarCantidad(producto.id)}>-</button>
                    <span>{cantidadProductos[producto.id] || 1}</span>
                    <button onClick={() => incrementarCantidad(producto.id)}>+</button>
                  </div>
                  <button onClick={() => removeProduct(producto.id)}>Eliminar</button>
                </div>
              </div>
            );
            }
            
          )}
        </div>
        <div className={styles.totalPrice}>Precio Total: ${calcularPrecioTotal()}</div>
        <button className={styles.checkout}>Realizar Pedido</button>
      </div>
    </div>
  );
};

export default Carrito;
