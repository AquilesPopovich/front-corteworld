import Link from "next/link"
import Image from "next/image"
import corteWorld from '../images/corteWorld.png';

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
                    NavBar
                </div>
            </nav>
        </>
    )
}