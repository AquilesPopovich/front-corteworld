import { ProductsList } from "@/app/types/typeProduct";
import React from "react";
import CardsProductos from "../cards/productos/mapeoCards/CardsProductos";
import CardProducto from "../cards/productos/cardProducto/CardProducto";

interface Props {
    deshabilitados: boolean,
    setDeshabilitados: (value: boolean) => void;
    productosDeshabilitados: ProductsList
}

const ProductosDeshabilitados: React.FC<Props> = ({ deshabilitados, setDeshabilitados, productosDeshabilitados }) => {
    if (!deshabilitados) return null;
    return (
        <div>
                <div className="fixed flex flex-row flex-wrap justify-start items-center h-3/4 w-3/6 left-1/4 bottom-10 border-solid rounded-lg bg-slate-50 p-4 overflow-y-auto">
                    {productosDeshabilitados?.map((producto => (
                        <div key={producto.id}>
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