'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect, useState } from 'react';
import UsuariosDeshabilitados from '../ui/usuariosDeshabilitados/UsuariosDeshabilitados';
import axiosURL from '@/axiosConfig/axiosConfig';
import ImagenProducto from '../ui/imagenProducto/ImagenProducto';
import { getAllProducts } from '@/redux/features/productsSlice';
import AgregarStock from '../ui/agregarStock/AgregarStock';
import Link from 'next/link';

// Wrap components that use useState with dynamic import
const CrearProducto = React.lazy(() => import('../ui/crearProducto/CrearProducto'));
const CardProducto = React.lazy(() => import('../ui/cards/productos/cardProducto/CardProducto'));

const Admin = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userSlice.user);
  const productos = useAppSelector(state => state.productsSlice.products);
  const [imagenes, setImagenes] = useState(false);
  const [stock, setStock] = useState(false);


  const [crearProducto, setCrearProducto] = useState(false);

  const [usuarios, setUsuarios] = useState([])

  const [filtrados, setFiltrados] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosURL('/user')
        if (data) setUsuarios(data)
      } catch (error) {
        console.error('Error al traer al user:', error);

      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    if (usuarios) {
      const usuariosFiltrados = usuarios.filter((usuario) => usuario?.status === false)
      setFiltrados(usuariosFiltrados)
    }
  }, [usuarios]);


  const [mostrarUsuarios, setMostrarUsuarios] = useState(false)

  const productosDeshabilitados = productos.filter(producto => !producto.status);

  if (!user[0]?.user?.admin) return null;

  return (
    <div className=' flex flex-col justify-evenly items-center w-screen h-screen'>
      <div className=' bg-black'>
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
        <button onClick={() => setMostrarUsuarios(true)}>Mostrar Usuarios Deshabilitados</button>
        {filtrados?.map((user) => {

          if (!mostrarUsuarios) return null

          return (
            <React.Suspense key={user?.id} fallback={<div>Loading...</div>}>
              <UsuariosDeshabilitados
                id={user?.id}
                name={user?.name}
                email={user?.email}
              />
            </React.Suspense>
          )
        })}
      </div>
      <button onClick={() => setImagenes(true)}>Añadir imagenes</button>
      <ImagenProducto imagenes={imagenes} setImagenes={setImagenes} productos={productos}/>
      <button onClick={()=> setStock(true)} >Agregar stock, colores y tallas a un producto</button>
      <AgregarStock stock={stock} setStock={setStock} productos={productos} />
      <Link href='/'>
        <button>
          Back
        </button>
      </Link>
    </div>
  );
};

export default Admin;
