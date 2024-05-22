'use client'
import React, { useEffect, useState } from 'react';
import { Chat } from '@mui/icons-material';
import { Menu } from '@/app/ui/menu/Menu';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hook';
import axiosURL from '@/axiosConfig/axiosConfig';
import { agregarCarrito } from '@/redux/features/carritoSlice';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import EditarStock from '@/app/ui/editarStock/EditarStock';
import styles from '../detail.module.css';

const DetailPage = () => {
    const [producto, setProducto] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [selectedImg, setSelectedImg] = useState(0);
    const [infoStock, setInfoStock] = useState([]);
    const [ropaSeleccionada, setRopaSeleccionada] = useState([]);
    const [editarStock, setEditarStock] = useState(false);
    const [cantidad, setCantidad] = useState(1);
    const [renderedSizes, setRenderedSizes] = useState(new Set()); // Nuevo estado
    const user = useAppSelector(state => state.userSlice.user);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosURL(`/products/${id}`);
                if (data) setProducto(data);
                const response = await axiosURL(`/imgProduct/${id}`);
                const dataImg = response.data;
                if (dataImg) setImagenes(dataImg);
                const respuesta = await axiosURL(`/stock-controller/${id}`);
                const dataStock = respuesta.data;
                if (dataStock) setInfoStock(dataStock);
            } catch (error) {
                if (error instanceof Error) console.error('Error al obtener los datos del producto:', error.message);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchComentarios = async () => {
            const res = await axiosURL(`/comentarios/${id}`);
            const dataComentario = res.data;
            if (dataComentario) setComentarios(dataComentario);
        };
        fetchComentarios();
    }, [id]);

    const handleAgregarCarrito = () => {
        if (!user.length) return Swal.fire({
            icon: "error",
            title: "Oops... necesitas iniciar sesión para esto",
            text: "¿Tienes una cuenta?",
        });
        dispatch(agregarCarrito({ id, name: producto.name, img: imagenes[0], mark: producto.mark, price: producto.price }));
        return Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Agregado al carrito correctamente",
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleImgClick = (index) => {
        setSelectedImg(index);
    };

    const handleComentarioChange = (e) => {
        setComentario(e.target.value);
    };

    const aumentarCantidad = () => {
        setCantidad(prevCantidad => prevCantidad + 1);
    };

    const reducirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(prevCantidad => prevCantidad - 1);
        }
    };

    const agregarComentario = async (e) => {
        e.preventDefault();
        if (comentario.trim() !== '') {
            try {
                const nuevoComentario = { userId: user[0]?.user?.id, comentario: String(comentario), productId: id };
                const { data } = await axiosURL.post(`/comentarios`, nuevoComentario);
                if (data) {
                    // Actualiza el estado de comentarios localmente
                    setComentarios(prevComentarios => [...prevComentarios, data]);
                    setComentario('');
                    return Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Comentario enviado correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Error al agregar comentario:', error.message);
            }
        }
    };

    const stockPorRopaSeleccionada = infoStock.find(ropa => ropa.id === ropaSeleccionada)?.stock || 'selecciona un color/talla...';

    const renderSizes = () => {
        const sizes = new Set();
        return infoStock.map(talla => {
            if (!sizes.has(talla.talla)) {
                sizes.add(talla.talla);
                return (
                    <button className={styles.btnTalla} key={talla.id} onClick={() => setRopaSeleccionada(talla.id)}>{talla.talla}</button>
                );
            }
            return null;
        });
    };

    return (
        <>
            <Menu />
            <div className="container mx-auto mt-8" style={{ marginTop: '120px' }}>
                <br />
                <div className={`flex flex-row gap-x-52 items-center md:flex-row space-y-4 ml-10 mr-10 md:space-x-4 ${styles.container}`}>
                    <div className={`w-full md:w-1/6 flex flex-col items-center ${styles.imagenes}`}>
                        {imagenes?.map((img, index) => (
                            <Image
                                key={index}
                                src={img.file}
                                alt={`Imagen ${index}`}
                                width={100}
                                height={100}
                                className={`w-20 h-auto rounded-lg shadow-md cursor-pointer ${selectedImg === index ? 'border-2 border-blue-500' : 'mr-2'}`}
                                onClick={() => handleImgClick(index)}
                            />
                        ))}
                    </div>
                    <div className={`w-full md:w-1/2 ${styles.imagenGrande}`}>
                        <Image
                            src={imagenes[selectedImg]?.file}
                            alt={`Imagen grande ${selectedImg}`}
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-lg shadow-md mb-4 md:float-right"
                        />
                    </div>
                    <div className={`w-full md:w-2/3 flex flex-col justify-between text-black font-semibold border h-200 border-gray-300 bg-white p-4 rounded-lg ${styles.info}`}>
                        <div>
                            <div className={styles.texto}>
                                <h1 className={`text-3xl font-bold mb-4 ${styles.titleTamaño}`}>{producto?.name}</h1>
                                <p className={`text-lg mb-2 ${styles.textoTamaño}`}>Marca: {producto?.mark}</p>
                                <p className={`text-lg mb-2 ${styles.textoTamaño}`}>Categoría: {producto?.category}</p>
                                <p className={`text-lg mb-4 ${styles.textoTamaño}`}>Precio: ${producto?.price}</p>
                            </div>
                            <div className={styles.stock}>
                                <select
                                    name=""
                                    id=""
                                    onChange={e => setRopaSeleccionada(e.target.value)}
                                    className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-indigo-500 ${styles.select}`}
                                >
                                    <option>Colores</option>
                                    {infoStock?.map(color => (
                                        <option className="text-black" key={color.id} value={color.id}>
                                            {color.color}
                                        </option>
                                    ))}
                                </select>
                                <p className='border-r-8 border-2-solid-white text-black'>stock disponible: {stockPorRopaSeleccionada ? stockPorRopaSeleccionada : 'selecciona un color/talla...'}</p>
                                {stockPorRopaSeleccionada && user?.user?.admin && <button onClick={() => setEditarStock(true)}>editar stock</button>}
                                <EditarStock editarStock={editarStock} setEditarStock={setEditarStock} idStock={ropaSeleccionada} idProducto={id} />
                            </div>
                            <div className={`flex items-center mb-4 ${styles.cantidad}`}>
                                <label htmlFor="cantidad" className="mr-2">Cantidad:</label>
                                <button onClick={reducirCantidad} className="bg-pink-400 hover:bg-pink-700 text-white py-1 px-3 rounded-md focus:outline-none">-</button>
                                <span className="mx-2">{cantidad}</span>
                                <button onClick={aumentarCantidad} className="bg-pink-400 hover:bg-pink-700 text-white py-1 px-3 rounded-md focus:outline-none">+</button>
                            </div>
                            <button onClick={handleAgregarCarrito} className={`bg-pink-400 hover:bg-pink-700 text-white py-2 px-4 rounded-md focus:outline-none ${styles.buttonAgregar}`}>Agregar al carrito</button>
                        </div>
                    </div>
                </div>
                <div className={styles.tallasDiv}>
                    Selecciona tu talla:
                    {renderSizes()}
                </div>

                <h2 className={`text-2xl font-bold mb-4 ml-5 text-black ${styles.coment}`}>Comentarios</h2>
                <div className={`w-full mt-8 ml-11 ${styles.comentContainer}`} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {comentarios.map((comentari, index) => (
                        <div key={index} className={`flex mb-4 items-start ${styles.allComents}`}>
                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full mr-4">
                                <Chat />
                            </div>
                            <div className={`bg-gray-100 text-black p-4 rounded-lg w-11/12 ${styles.comentario}`}>
                                <p className="text-lg font-semibold">{comentari?.user?.name}</p>
                                <p className="text-lg">{comentari?.comentario}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={agregarComentario} className={`w-full mt-8 mb-8 ml-16 text-black ${styles.form}`}>
                    <label htmlFor="comentario" className={`block text-lg font-semibold mb-2 ${styles.deja}`}>Deja tu comentario:</label>
                    <textarea
                        id="comentario"
                        name="comentario"
                        value={comentario}
                        onChange={handleComentarioChange}
                        className=" w-11/12 border text-black rounded-md p-2"
                    ></textarea>
                    <button type="submit" className="mt-2 bg-pink-400 hover:bg-pink-700 text-white py-2 px-4 rounded-md focus:outline-none">Enviar comentario</button>
                </form>
            </div>
        </>
    );
}

export default DetailPage;
