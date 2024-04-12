import Carrousel from "./ui/carrousel/Carrousel";
import styles from './landing.module.css'
import CardsProductos from "./ui/cards/productos/mapeoCards/CardsProductos";

export default function Home() {
  return (
    <>
      <div className={styles.divCategoriasCarrusel}>
        <Carrousel />
      </div>
      <CardsProductos/>
    </>
  );
}
