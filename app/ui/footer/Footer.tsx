import Link from "next/link";
import Image from "next/image";
import webpay from '../images/webpay.png';
import bc from '../images/bc.png';

export const Footer = () => {
    return (
        <>
            <footer className=" bg-black text-white">
                <div className=" font-serif md:flex md: justify-evenly md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
                <p>Todos los derechos reservados Corte World©2024</p>
                    <div>
                        <h1 className='text-xl font-serif'>Nosotros</h1>
                        <Link href='/tienda'><p>Tienda</p></Link>
                        <Link href='/equipo'>Equipo de desarrollo</Link>
                    </div>
                    <div>
                        <h1 className="text-xl">Contacto</h1>
                        <p className=" text-sm">+56 9 8647 5277</p>
                        <p className="text-sm"> octavitoooibanez@gmail.com</p>
                    </div>
                    <Image src={webpay} alt={"Transbank"} className=" size-1/12"></Image>
                    <Image src={bc} alt={"BancoEstado"} className=" size-1/12"></Image>
                </div>
            </footer>
        </>
    )
}