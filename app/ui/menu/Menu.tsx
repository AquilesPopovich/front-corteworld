import Link from 'next/link';
import Image from 'next/image';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import styles from './menu.module.css';
import corteWorld from '../../../public/images/corteWorld.png'
import { SearchProduct } from './searchFunction/SearchFunction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export const Menu = () => {
  return (
    <nav className={`bg-gray-800 text-white flex justify-between items-center p-4 ${styles.navBar}`}>
      <div className="flex items-center">
        {/* Logo */}
            <Image src={corteWorld} alt="CorteWorld" width={70} height={70} />
        <div className="mr-4">
          <Link href="/" className={`ml-4 ${styles.link}`}>Home</Link>
        </div>
      </div>

      {/* SearchBar */}
      <div>
        {/* Después cambiar status por los de products */}
        <SearchProduct status={true}/>
      </div>

      {/* Enlaces con iconos */}
      <div className="flex items-center">
        <div className="ml-4 flex items-center">
          {/* <Image src={corteWorld} alt="Productos" width={20} height={20} /> */}
          <Link href="/productos" className={`ml-1 ${styles.link}`}>Productos</Link>
        </div>
        <div className="ml-4 flex items-center">
          {/* <Image src={corteWorld} alt="Favoritos" width={20} height={20} /> */}
          <Link href="/favoritos" className={`ml-1 ${styles.link}`}>Favoritos</Link>
        </div>
        <div className="ml-4 flex items-center">
          <Link href='/carrito' className={`ml-1 ${styles.link}`}><ShoppingCartOutlinedIcon /></Link>
        </div>
        <div className="ml-4 flex items-center">
          {/* <Image src={corteWorld} alt="Historial" width={20} height={20} /> */}
          <Link href="/historial" className={`ml-1 ${styles.link}`}>Historial</Link>
        </div>
      </div>
    </nav>
  );
};
