'use client'
import { useAppSelector } from '@/redux/hook';
import React, { useState } from 'react';

// Wrap components that use useState with dynamic import
const CrearProducto = React.lazy(() => import('../ui/crearProducto/CrearProducto'));
const CardProducto = React.lazy(() => import('../ui/cards/productos/cardProducto/CardProducto'));

const Admin = () => {
  const user = useAppSelector(state => state.userSlice.user);
  const productos = useAppSelector(state => state.productsSlice.products);

  const [crearProducto, setCrearProducto] = useState(false);

  const productosDeshabilitados = productos.filter(producto => !producto.status);

  console.log(user[0]?.admin);

  if (!user[0]?.user?.admin) return null;

  return (
    <div>
      <div>
        <button onClick={() => setCrearProducto(true)}>Crear producto</button>
        <React.Suspense fallback={<div>Loading...</div>}>
          {crearProducto && <CrearProducto crearProducto={crearProducto} setCrearProducto={setCrearProducto} />}
        </React.Suspense>
      </div>
      <div>
        <button>Mostrar productos deshabilitados</button>
        {productosDeshabilitados?.map(productoDeshabilitado => (
          <React.Suspense key={productoDeshabilitado?.id} fallback={<div>Loading...</div>}>
            <CardProducto
              id={productoDeshabilitado?.id}
              name={productoDeshabilitado?.name}
              img={productoDeshabilitado?.imgs}
              mark={productoDeshabilitado?.mark}
              price={productoDeshabilitado?.price}
            />
          </React.Suspense>
        ))}
      </div>
    </div>
  );
};

export default Admin;
