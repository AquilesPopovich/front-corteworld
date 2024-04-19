import { useAppSelector } from '@/redux/hook';
import React, { useState } from 'react'
import CrearProducto from '../ui/crearProducto/CrearProducto';
import CardProducto from '../ui/cards/productos/cardProducto/CardProducto';



const Admin = () =>{

  const user = useAppSelector(state => state.userSlice.user);
  const productos = useAppSelector(state => state.productsSlice.products);

  const [crearProducto, setCrearProducto] = useState(false)

  const productosDeshabilitados = productos.filter(producto => !producto.status)



  if(!user[0].admin) return null


  return (
    <div>
        <div>
        <button onClick={()=> setCrearProducto(true)}>Crear producto</button>
        <CrearProducto crearProducto={crearProducto} setCrearProducto={setCrearProducto}/>

        </div>
        <div>
            <button>Mostrar productos deshabilitados</button>
            {productosDeshabilitados?.map((productoDeshabilitado) => (
                <CardProducto
                 key={productoDeshabilitado?.id}
                 id={productoDeshabilitado?.id}
                 name={productoDeshabilitado?.name}
                 img={productoDeshabilitado?.imgs}
                 mark={productoDeshabilitado?.mark}
                 price={productoDeshabilitado?.price}
                />

            ))}
        </div>
    </div>
  )
}

export default Admin