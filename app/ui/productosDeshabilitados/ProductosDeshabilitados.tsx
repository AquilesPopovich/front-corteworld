import { ProductsList } from "@/app/types/typeProduct";
import React from "react";
import CardProducto from "../cards/productos/cardProducto/CardProducto";
import styles from './productosDeshabilitados.module.css';

interface Props {
    deshabilitados: boolean,
    setDeshabilitados: (value: boolean) => void;
    productosDeshabilitados: ProductsList
}

const ProductosDeshabilitados: React.FC<Props> = ({ deshabilitados, setDeshabilitados, productosDeshabilitados }) => {
    if (!deshabilitados) return null;
    return (
        <div>
            <div className={`fixed flex flex-row flex-wrap justify-start items-center h-3/4 w-3/4 left-80 bottom-10 border-solid rounded-lg bg-slate-50 p-4 overflow-y-auto ${styles.container}`}>
                {productosDeshabilitados?.map((producto => (
                    <div className={styles.cardProducto} key={producto.id}>
                        <CardProducto
                            id={producto?.id}
                            name={producto?.name}
                            img={producto?.imgs}
                            mark={producto?.mark}
                            price={producto?.price}
                        />
                    </div>
                )))}
                <button className=' bg-pink-200 rounded-md hover:bg-pink-400' onClick={() => setDeshabilitados(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default ProductosDeshabilitados;