import Link from "next/link"
import Image from "next/image"
import corteWorld from '../images/corteWorld.png';

export const Menu = () => {

    return(
        <>
            <nav className=" bg-white flex justify-evenly md:items-center">
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
                    // value=''
                    className=" bg-white border-x-2 border-y-2 border-neutral-800 mr-4"
                    />
                    <button
                    className=" bg-white border-x-2 border-y-2 border-neutral-800">
                        Search</button>
                </div>
            </nav>
        </>
    )
}