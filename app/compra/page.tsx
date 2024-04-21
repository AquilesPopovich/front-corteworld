import React from 'react';
import axiosURL from '@/axiosConfig/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';

const ProductoPequeno = ({ producto }) => {
  return (
    <div className="flex items-center border border-gray-200 rounded p-2 m-2">
      <img src={producto?.imagen} alt={producto?.nombre} className="w-16 h-16 mr-2" />
      <div>
        <p className="font-semibold">{producto?.nombre}</p>
        <p>Cantidad: {producto?.cantidad}</p>
        <p>Precio: {producto?.precio}</p>
      </div>
    </div>
  );
};

const Compra = () => {
  const carritoRedux = useSelector((state: any) => state.carritoSlice.carrito);
  const user = useSelector((state: any) => state.userSlice.user);

  const idsProductos = carritoRedux.map((producto) => producto.id);
  const infoCarrito = {
    userC: user[0].user.id,
    productos: idsProductos
  };

  const postCarrito = async () => {
    try {
      const { data } = await axiosURL.post('/carrito', infoCarrito);
      if(data) alert('creado carrito')
    } catch (error) {
      console.error('Error al enviar el carrito:', error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Productos seleccionados de {user[0].user.name}</h2>
      <div className="flex flex-wrap">
        {carritoRedux.map((producto) => (
          <ProductoPequeno key={producto.id} producto={producto} />
        ))}
      </div>
      <div className="mt-8">
        <label htmlFor="direccion" className="block font-semibold">Dirección de envío:</label>
        <input type="text" id="direccion" name="direccion" className="border border-gray-200 rounded px-4 py-2 mt-2" />
      </div>
      <button onClick={postCarrito} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Realizar Compra</button>
    </div>
  );
};

export default Compra;
