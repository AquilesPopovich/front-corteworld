import React, { useState } from 'react';
import { ProductsList } from '../../types/typeProduct';
import { FaTimes } from 'react-icons/fa';
import axiosURL from '@/axiosConfig/axiosConfig';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { agregarPaymentId, eliminarPaymentId } from '@/redux/features/carritoSlice';

const MySwal = withReactContent(Swal);

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
    const paymentId = useAppSelector(state => state.carritoSlice.paymentId);
    const dispatch = useAppDispatch();
    console.log(paymentId)

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
            MySwal.fire({
                icon: 'error',
                title: 'Dirección de envío requerida',
                text: 'Por favor, ingrese una dirección válida.',
            });
            return;
        }
        try {
            const response = await axiosURL.post('/payments', payment);
            console.log(response)
            if (response.data) {
                setWebPay({ url: response.data.response.url, token: response.data.response.token });
                window.location.href = `${response.data.response.url}?token_ws=${response.data.response.token}`;
                setPayment({ carritoId: 0, status: 'PENDING', type: 'WEBPAY', direction: '' });
                if(paymentId.length) dispatch(eliminarPaymentId());
                dispatch(agregarPaymentId(response.data.newPayment.id));
            }
            
        } catch (error) {
            if (error instanceof Error) throw Error(error.message);
        }
    };
    
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
                <div onClick={() => { deleteCarrito(); setIdCompra(0); }} className='relative top-0 left-0 cursor-pointer'>
                    <FaTimes />
                </div>
                <div className='flex flex-col justify-evenly items-start'>
                    <p>Indica tu dirección: </p>
                    <input type="direction" name='direction' className='w-full h-10 border border-gray-400 rounded-lg mb-3' onChange={handleChange} />
                </div>

                {/* <form name='rec20108_btn1' method='post' action='https://www.webpay.cl/backpub/external/form-pay'>
                    <input type='hidden' name='idFormulario' value='174072' />
                    <input type='hidden' name='monto' value='100' />
                    <input type='image' title='Imagen' name='button1' src='https://www.webpay.cl/assets/img/boton_webpaycl.svg' value='Boton 1' disabled={!payment.direction} className={`disabled:cursor-default transition-all ${!payment.direction ? 'disabled:grayscale' : ''}`} />
                </form> */}
                <button className="bg-pink-500 text-white px-4 py-2 rounded mt-4 w-full" onClick={createPayment} >Ir a pagar</button>

                <button className="bg-red-500 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded mt-4" onClick={() => { deleteCarrito(); setIdCompra(0); }}>Cancelar pago</button>
            </div>
        </div>
    );


}
export default Compra;
