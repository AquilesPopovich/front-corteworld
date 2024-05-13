'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect, useState } from 'react';
import UsuariosDeshabilitados from '../ui/usuariosDeshabilitados/UsuariosDeshabilitados';
import axiosURL from '@/axiosConfig/axiosConfig';
import ImagenProducto from '../ui/imagenProducto/ImagenProducto';
import { getAllProducts } from '@/redux/features/productsSlice';
import AgregarStock from '../ui/agregarStock/AgregarStock';
import { Menu } from '../ui/menu/Menu';
import styles from './admin.module.css';
import ProductosDeshabilitados from '../ui/productosDeshabilitados/ProductosDeshabilitados';

const CrearProducto = React.lazy(() => import('../ui/crearProducto/CrearProducto'));

const Admin = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userSlice.user);
  const productos = useAppSelector(state => state.productsSlice.products);
  const [imagenes, setImagenes] = useState(false);
  const [stock, setStock] = useState(false);
  const [crearProducto, setCrearProducto] = useState(false);
  const [deshabilitados, setDeshabilitados] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

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
      const usuariosFiltrados = usuarios.filter((usuario: any) => usuario?.status === false)
      setFiltrados(usuariosFiltrados)
    }
  }, [usuarios]);
  const productosDeshabilitados = productos.filter(producto => !producto.status);
  if (!user[0]?.user?.admin) return null;

  return (
    <div className='flex h-screen w-screen justify-start items-center text-black'>
      <Menu />
      <div className={`bg-white border rounded-lg flex flex-col justify-evenly items-center h-screen p-3 w-fit ${styles.container}`}>
        <div className='mt-24'>
          <h2 className=' text-3xl'>Funciones de admin</h2>
        </div>
          <button className='w-full m-1 cursor-pointer hover:scale-110 transition' onClick={() => setCrearProducto(true)}>Crear producto</button>
          <React.Suspense fallback={<div className={styles.loader}></div>}>
            {crearProducto && <CrearProducto crearProducto={crearProducto} setCrearProducto={setCrearProducto} />}
          <button className='w-full m-1 cursor-pointer hover:scale-110 transition' onClick={() => setImagenes(true)}>Añadir imágenes</button>
          <ImagenProducto imagenes={imagenes} setImagenes={setImagenes} productos={productos} />
          <button className='w-full m-1 cursor-pointer hover:scale-110 transition' onClick={() => setStock(true)}>Stock, colores y tallas</button>
          <AgregarStock stock={stock} setStock={setStock} productos={productos} />
          </React.Suspense>
          <button className='w-full m-1 cursor-pointer hover:scale-110 transition' onClick={() => setDeshabilitados(true)}>Mostrar productos deshabilitados</button>
          <div className='fixed left-2/4'>
            <ProductosDeshabilitados deshabilitados={deshabilitados} setDeshabilitados={setDeshabilitados} productosDeshabilitados={productosDeshabilitados}  />
          </div>
          <button className='w-full m-1 cursor-pointer hover:scale-110 transition' onClick={() => setMostrarUsuarios(true)}>Mostrar Usuarios Deshabilitados</button>
          {filtrados?.map((user) => {
            return (
              <React.Suspense key={user?.id} fallback={<div className={styles.loader}></div>}>
                <UsuariosDeshabilitados
                  id={user?.id}
                  name={user?.name}
                  email={user?.email}
                  mostrarUsuarios={mostrarUsuarios}
                  setMostrarUsuarios={setMostrarUsuarios}
                />
              </React.Suspense>
            )
          })}
      </div>
    </div>
  );
};

export default Admin;
