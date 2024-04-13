import Link from "next/link"
import Image from "next/image"
import corteWorld from '../images/corteWorld.png';
import { useAppSelector } from "@/redux/hook";

export const Menu = () => {

    return(
        <>
            <nav className=" bg-white flex justify-around md:items-center">
                <div>
                    <Image src={corteWorld} alt="CorteWorld"/>
                </div>
                <Link href='/products'>Productos</Link>
                <div>
                <Link href='/favorites'>Favoritos</Link>
                </div>
                <div>
                <Link href='/carrito'>Carrito</Link>
                </div>
                <div>
                    <Link href='/historial'>Historial</Link>
                </div>
                <div>
                    <input type="text"
                    placeholder="Search a product..."
                    value='product'
                    className=" bg-white border-x-4 border-y-4 border-neutral-800"
                    />
                    <button
                    className=" bg-whiteb order-x-4 border-y-4 border-neutral-800">
                        Search</button>
                </div>
            </nav>
        </>
    )
}