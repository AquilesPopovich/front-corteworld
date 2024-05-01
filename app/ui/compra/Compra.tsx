import React, { useState } from 'react';
import { ProductsList } from '../../types/typeProduct';
import { FaTimes } from 'react-icons/fa';
import axiosURL from '@/axiosConfig/axiosConfig';

interface Props {
    compra: boolean,
    setCompra: (value: boolean) => void,
    productos: ProductsList,
    idCompra: number,
    setIdCompra: (value: number) => void
    setCarrito: (value: boolean) => void
}

const Compra: React.FC<Props> = ({ compra, setCompra, productos, idCompra, setIdCompra, setCarrito }) => {
    if (!compra) return null;

    const [payment, setPayment] = useState({
        carritoId: idCompra,
        status: 'PENDING',
        type: 'WEBPAY',
        direction: ''
    })

    const [webPay, setWebPay] = useState({ url: '', token: '' })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPayment({
            ...payment,
            [event.target.name]: event.target.value
        })
    }

    const createPayment = async (): Promise<void> => {
        if (!payment.direction) {
            alert('Por favor, ingrese una dirección válida.');
            return;
        }
        try {
            const { data } = await axiosURL.post('/payments', payment);
            if (data) {
                setWebPay({ url: data.url, token: data.token })
                window.location.href = `${data.url}?token_ws=${data.token}`
                setPayment({ carritoId: 0, status: 'PENDING', type: 'WEBPAY', direction: '' })
            }
        } catch (error) {
            if (error instanceof Error) throw Error(error.message)
        }
    }

    const deleteCarrito = async (): Promise<void> => {
        try {
            const { data } = await axiosURL.delete(`/carrito/${idCompra}`)
            if (data) {
                setCompra(false)
                setCarrito(false)
            }
        } catch (error) {
            if (error instanceof Error) throw Error(error.message)
        }
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center py-6 ">
            <div className={`flex flex-col items-center justify-center gap-5 z-10 bg-pink-100 w-2/4 h-3/5 border border-gray-200 rounded my-6`}>
                <div onClick={() => {deleteCarrito(); setIdCompra(0);}} className='relative top-0 left-0 cursor-pointer'>
                    <FaTimes />
                </div>
                <div className="mt-8 w-2/4">
                    <p className=' mb-5'>Escribe tu dirección para llevar tu pedido:</p>
                    <label htmlFor="direction" className="block font-semibold text-xl">Dirección de envío:</label>
                    <input type="text" id="direction" name="direction" value={payment.direction} onChange={handleChange} className="border border-gray-200 rounded px-4 py-2 mt-2 w-full" />
                </div>
                {payment.direction &&
                    <form name='rec20108_btn1' method='post' action='https://www.webpay.cl/backpub/external/form-pay'>
                        <input type='hidden' name='idFormulario' value='174072' />
                        <input type='hidden' name='monto' value='100' />
                        <input type='image' title='Imagen' name='button1' src='https://www.webpay.cl/assets/img/boton_webpaycl.svg' value='Boton 1' />
                        <button hidden className="bg-pink-500 text-white px-4 py-2 rounded mt-4" onClick={createPayment}>Ir a pagar</button>
                    </form>
                }

                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mt-4" onClick={() => {deleteCarrito(); setIdCompra(0);}}>Cancelar pago</button>
            </div>
        </div>
    );


}
export default Compra;
