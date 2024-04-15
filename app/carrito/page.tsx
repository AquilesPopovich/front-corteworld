import { Menu } from "@mui/icons-material"
import { Footer } from "../ui/footer/Footer"

const Carrito = () => {
    return(
        <>
            <div className="flex flex-col min-h-screen">
                <Menu/>
                <div>
                    <h1>Carrito de compras</h1>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Carrito