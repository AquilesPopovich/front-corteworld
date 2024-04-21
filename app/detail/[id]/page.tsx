import React, { useEffect, useState } from 'react';
import { Chat } from '@mui/icons-material';
import { Menu } from '@/app/ui/menu/Menu';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hook';
import axiosURL from '@/axiosConfig/axiosConfig';
import { agregarCarrito } from '@/redux/features/carritoSlice';

const DetailPage = () => {
    const [producto, setProducto] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [selectedImg, setSelectedImg] = useState(0);
    const [cantidad, setCantidad] = useState(1);
    const user = useAppSelector(state => state.userSlice.user);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const { data } = await axios(`/products/${id}`);
                if(data){
                    setProducto(data);
                    const { dataImg } = await axios(`/imgProduct/${id}`);
                    if (dataImg) setImagenes(dataImg);
                    const { dataComentario } = await axios(`/comentarios/${id}`);
                    if (dataComentario) setComentarios(dataComentario);
                }
              
            } catch (error: any) {
                console.error('Error al obtener los datos del producto:', error.message);
            }
        };
        fetchData();
    }, [id]);

    const handleAgregarCarrito = () => {
        if (!user) alert('Necesitas iniciar sesión para agregar un producto al carrito');
        dispatch(agregarCarrito({ id, name: producto.name, img: imagenes[0], mark: producto.mark, price: producto.price }));
    };

    const handleImgClick = (index) => {
        setSelectedImg(index);
    };

    const handleComentarioChange = (e) => {
        setComentario(e.target.value);
    };

    const aumentarCantidad = () => {
        setCantidad((prevCantidad) => prevCantidad + 1);
    };

    const reducirCantidad = () => {
        if (cantidad > 1) {
            setCantidad((prevCantidad) => prevCantidad - 1);
        }
    };

    const agregarComentario = async (e) => {
        e.preventDefault();
        if (comentario.trim() !== '') {
            try {
                const nuevoComentario = { userId: user[0]?.user?.id, comentario: comentario, productId: id };
                const { data } = await axios.post(`/comentarios`, nuevoComentario);
                setComentarios([...comentarios, data]);
            } catch (error) {
                console.error('Error al agregar comentario:', error.message);
            }
        }
    };

    return (
        <>
            <Menu />
            <div className="container mx-auto mt-8" style={{ marginTop: '120px' }}>
                <br />
                <div className="flex flex-row gap-x-52 items-center md:flex-row space-y-4 md:space-x-4">
                    <div className="w-full md:w-1/6 flex flex-col items-center">
                        {imagenes?.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`Imagen ${index}`}
                                width={100}
                                height={100}
                                className={`w-20 h-auto rounded-lg shadow-md cursor-pointer ${selectedImg === index ? 'border-2 border-blue-500' : 'mr-2'}`}
                                onClick={() => handleImgClick(index)}
                            />
                        ))}
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image
                            src={imagenes[selectedImg]}
                            alt={`Imagen grande ${selectedImg}`}
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-lg shadow-md mb-4 md:float-right"
                        />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{producto?.name}</h1>
                            <p className="text-lg mb-2">Marca: {producto?.mark}</p>
                            <p className="text-lg mb-2">Stock: {producto?.stock}</p>
                            <p className="text-lg mb-2">Categoría: {producto?.category}</p>
                            <p className="text-lg mb-4">Precio: ${producto?.price}</p>
                            <div className="flex items-center mb-4">
                                <label htmlFor="cantidad" className="mr-2">Cantidad:</label>
                                <button onClick={reducirCantidad} className="bg-pink-400 hover:bg-pink-700 text-white py-1 px-3 rounded-md focus:outline-none">-</button>
                                <span className="mx-2">{cantidad}</span>
                                <button onClick={aumentarCantidad} className="bg-pink-400 hover:bg-pink-700 text-white py-1 px-3 rounded-md focus:outline-none">+</button>
                            </div>
                            <button onClick={handleAgregarCarrito} className="bg-pink-400 hover:bg-pink-700 text-white py-2 px-4 rounded-md focus:outline-none">Agregar al carrito</button>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 ml-5">Comentarios</h2>
                <div className="w-full mt-8 ml-11" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {comentarios.map((comentario, index) => (
                        <div key={index} className="flex mb-4 items-start">
                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full mr-4">
                                <Chat />
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg w-11/12">
                                <p className="text-lg font-semibold">{comentario.name}</p>
                                <p className="text-lg">{comentario.comentario}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={agregarComentario} className="w-full mt-8 mb-8 ml-16">
                    <label htmlFor="comentario" className="block text-lg font-semibold mb-2">Deja tu comentario:</label>
                    <textarea
                        id="comentario"
                        name="comentario"
                        value={comentario}
                        onChange={handleComentarioChange}
                        className=" w-11/12 border rounded-md p-2"
                    ></textarea>
                    <button type="submit" className="mt-2 bg-pink-400 hover:bg-pink-700 text-white py-2 px-4 rounded-md focus:outline-none">Enviar comentario</button>
                </form>
            </div>
        </>
    );
}

export default DetailPage;
