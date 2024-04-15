'use client'
import React, { useState } from 'react';
import { Chat } from '@mui/icons-material';
import { Menu } from '@/app/ui/menu/Menu';
import Image from 'next/image';

const DetailPage = () => {
    const producto = {
        id: 3,
        imgs: [
            'https://res.cloudinary.com/dphpu225t/image/upload/v1708733825/teclado_dx8rko.png',
            'https://res.cloudinary.com/dphpu225t/image/upload/v1708733824/mouse_pubjux.png',
            'https://res.cloudinary.com/diswtvj50/image/upload/v1708807040/cpu3_fcg4as.png'
        ],
        name: 'CPU Gamer',
        mark: 'Corsair',
        stock: 10,
        category: 'buzos',
        price: 1500,
        comentarios: [
            { name: 'javier', comentario: 'buen producto' },
            { name: 'lucas', comentario: 'mal producto :c' },
            { name: 'javier', comentario: 'buen producto' },
            { name: 'javier', comentario: 'buen producto' },
            { name: 'javier', comentario: 'buen producto' },
            { name: 'javier', comentario: 'buen producto' },
            { name: 'javier', comentario: 'buen producto' },
            { name: 'javier', comentario: 'buen producto' },
        ]
    };

    const [selectedImg, setSelectedImg] = useState(0); // Estado para almacenar la imagen seleccionada

    const handleImgClick = (index) => {
        setSelectedImg(index);
    };

    const [cantidad, setCantidad] = useState(1);
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState(producto.comentarios);

    const handleCantidadChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setCantidad(value);
        }
    };

    const handleComentarioChange = (e) => {
        setComentario(e.target.value);
    };

    const agregarAlCarrito = () => {
        console.log(`Se agregarán ${cantidad} unidades del producto al carrito`);
    };

    const aumentarCantidad = () => {
        setCantidad((prevCantidad) => prevCantidad + 1);
    };

    const reducirCantidad = () => {
        if (cantidad > 1) {
            setCantidad((prevCantidad) => prevCantidad - 1);
        }
    };

    const agregarComentario = (e) => {
        e.preventDefault();
        if (comentario.trim() !== '') {
            const nuevoComentario = { name: 'Usuario', comentario: comentario };
            setComentarios([...comentarios, nuevoComentario]);
            setComentario('');
        }
    };

    return (
        <>
        <Menu />
        <div className="container mx-auto mt-8" style={{ marginTop: '120px' }}>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2"> {/* Reducir el espacio entre las columnas */}
    <div className="w-1/5 md:w-1/6 flex flex-col items-center"> {/* Reducir el ancho y el espacio alrededor */}
        {producto.imgs.map((img, index) => (
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
    <div className="w-2/5 md:w-1/2"> {/* Reducir el ancho */}
        <Image
            src={producto.imgs[selectedImg]}
            alt={`Imagen grande ${selectedImg}`}
            width={500} // Define el ancho deseado para la miniatura de la imagen
                                height={500}
            className="w-full h-auto rounded-lg shadow-md mb-4 md:float-right"
        />
    </div>
    <div className="w-2/5 md:w-2/3 flex flex-col justify-between"> {/* Aumentar el ancho */}
        <div>
            <h1 className="text-3xl font-bold mb-4">{producto.name}</h1>
            <p className="text-lg mb-2">Marca: {producto.mark}</p>
            <p className="text-lg mb-2">Stock: {producto.stock}</p>
            <p className="text-lg mb-2">Categoría: {producto.category}</p>
            <p className="text-lg mb-4">Precio: ${producto.price}</p>
            <div className="flex items-center mb-4">
                <label htmlFor="cantidad" className="mr-2">Cantidad:</label>
                <button onClick={reducirCantidad} className="bg-pink-400 hover:bg-pink-700 text-white py-1 px-3 rounded-md  focus:outline-none">-</button>
                <span className="mx-2">{cantidad}</span>
                <button onClick={aumentarCantidad} className="bg-pink-400 hover:bg-pink-700 text-white py-1 px-3 rounded-md  focus:outline-none">+</button>
            </div>
            <button onClick={agregarAlCarrito} className="bg-pink-400 hover:bg-pink-700 text-white py-2 px-4 rounded-md  focus:outline-none">Agregar al carrito</button>
        </div>
    </div>
</div>


            <div className="w-full mt-8" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
                {comentarios.map((comentario, index) => (
                    <div key={index} className="flex mb-4 items-start">
                        <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full mr-4">
                            <Chat />
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg w-full">
                            <p className="text-lg font-semibold">{comentario.name}</p>
                            <p className="text-lg">{comentario.comentario}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={agregarComentario} className="w-full mt-8 mb-8">
                <label htmlFor="comentario" className="block text-lg font-semibold mb-2">Deja tu comentario:</label>
                <textarea
                    id="comentario"
                    name="comentario"
                    value={comentario}
                    onChange={handleComentarioChange}
                    className="w-full border rounded-md p-2"
                ></textarea>
                <button type="submit" className="mt-2 bg-pink-400 hover:bg-pink-700 text-white py-2 px-4 rounded-md focus:outline-none">Enviar comentario</button>
            </form>
        </div>
    </>
    
    
    
    

    
    
    );
}

export default DetailPage;
