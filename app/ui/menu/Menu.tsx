'use client'
import Link from 'next/link';
import Image from 'next/image';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import styles from './menu.module.css';
import corteWorld from '../../../public/images/corteWorld.png'
import { SearchProduct } from './searchFunction/SearchFunction';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from 'react';
import MenuModal from '../menuModal/MenuModal';
import Login from '../loggin/Login';
import Carrito from '../Carrito/Carrito';
import { useAppSelector } from '@/redux/hook';

export const Menu = () => {

  const [menu, setMenu] = useState(false);
  const [loggin, setLoggin] = useState(false)
  const [carrito, setCarrito] = useState(false)
  const user = useAppSelector(state => state.userSlice.user);


  if (user.length) {
    return (
      <nav className={`bg-pink-400 text-white flex justify-between items-center p-4 ${styles.navBar}`}>
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" ><Image src={corteWorld} alt="CorteWorld" width={70} height={70} className={`${styles.logo}`} /></Link>
          <div className="">
            <Link href="/" className={`ml-4 ${styles.link}`}>Home</Link>
          </div>
          <div className="ml-8">
            <button onClick={() => setMenu(true)} className={` ${styles.link}`}>Menu</button>
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
            <button onClick={() => setCarrito(true)} className={`ml-1 text-pink-300 ${styles.link}`} ><ShoppingCartOutlinedIcon /></button>
          </div>
          {user[0]?.admin && ( 
            <div className="ml-4 flex items-center">
              <button className={`ml-1 ${styles.link}`}>Admin</button> 
            </div>
          )}
          <div className="ml-4 flex items-center">
            <Link href="/productos" className={`ml-1 ${styles.link}`}>Productos</Link>
          </div>
          
            <div className="ml-4 flex items-center">
              <button className={`ml-1 ${styles.link}`}>{user[0]?.name}</button> 
            </div>
       
        </div>
        <MenuModal menu={menu} setMenu={setMenu} />
        <Carrito carrito={carrito} setCarrito={setCarrito} />
      </nav>
    );
  }
  


  return (
    <nav className={`bg-pink-400 text-white flex justify-between items-center p-4 ${styles.navBar}`}>
      <div className="flex items-center">
        {/* Logo */}
            <Link href="/" ><Image src={corteWorld} alt="CorteWorld" width={70} height={70} className={`${styles.logo}`} /></Link>
        <div className="">
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
          <button onClick={()=> setCarrito(true)} className={`ml-1 text-pink-400 ${styles.link}`} ><ShoppingCartOutlinedIcon /></button>
        </div>
        <div className="ml-4 flex items-center">
          <Link href="/productos" className={`ml-1 ${styles.link}`}>Productos</Link>
        </div>
      <div className="ml-4 flex items-center">
          <button onClick={()=> setLoggin(true)} className={`ml-1 text-pink-400 ${styles.link}`} ><PersonOutlineIcon /></button>
        </div>
      </div>
      <MenuModal menu={menu} setMenu={setMenu} />
      <Login loggin={loggin} setLoggin={setLoggin} />
      <Carrito carrito={carrito} setCarrito={setCarrito} />
    </nav>
  );
};
