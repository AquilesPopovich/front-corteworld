import Carrousel from "./ui/carrousel/Carrousel";
import styles from './landing.module.css'
import CardsProductos from "./ui/cards/productos/mapeoCards/CardsProductos";
import { Footer } from "./ui/footer/Footer";
import { Menu } from './ui/menu/Menu';

export default function Home() {
  return (
    <>
        <Menu/>
      <div className={styles.divCategoriasCarrusel}>
        <Carrousel />
      </div>
      <CardsProductos />
      <Footer />
    </>
  );
}
