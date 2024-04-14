import Link from 'next/link';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import styles from './menu.module.css';
import corteWorld from '../../../public/images/corteWorld.png';

export const Menu = () => {
  return (
    <nav className={`bg-gray-800 text-white flex justify-between items-center p-4 ${styles.navBar}`}>
      <div className="flex items-center">
        {/* Logo */}
        <div className="mr-4">
          <Link href="/">
            <Image src={corteWorld} alt="CorteWorld" width={70} height={70} />
          </Link>
        </div>
      </div>

      {/* SearchBar */}
      <div className={`flex items-center ${styles.searchContainer}`}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Busca un producto"
          className={`${styles.searchInput} text-black`}
          style={{ fontSize: '13px', paddingLeft: '15px' }}
        />
      </div>

      {/* Enlaces con iconos */}
      <div className="flex items-center">
        <div className="ml-4 flex items-center">
          <Image src={corteWorld} alt="Productos" width={20} height={20} />
          <Link href="/productos" className={`ml-2 ${styles.link}`}>Productos</Link>
        </div>
        <div className="ml-4 flex items-center">
          <Image src={corteWorld} alt="Favoritos" width={20} height={20} />
          <Link href="/favorites" className={`ml-2 ${styles.link}`}>Favoritos</Link>
        </div>
        <div className="ml-4 flex items-center">
          <ShoppingCartOutlinedIcon />
        </div>
        <div className="ml-4 flex items-center">
          <Image src={corteWorld} alt="Historial" width={20} height={20} />
          <Link href="/historial" className={`ml-2 ${styles.link}`}>Historial</Link>
        </div>
      </div>
    </nav>
  );
};
