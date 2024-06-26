'use client'
import Link from 'next/link';
import Image from 'next/image';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import styles from './style.module.scss'
import corteWorld from '../../../public/images/corteWorld.png'
import { SearchProduct } from './searchFunction/SearchFunction';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from 'react';
import MenuModal from '../menuModal/MenuModal';
import Login from '../loggin/Login';
import Carrito from '../Carrito/Carrito';
import { useAppSelector } from '@/redux/hook';
import { AnimatePresence } from 'framer-motion';
import { FaPowerOff } from 'react-icons/fa';

export const Menu = () => {

  const [menu, setMenu] = useState(false);
  const [loggin, setLoggin] = useState(false)
  const [carrito, setCarrito] = useState(false)
  const user = useAppSelector(state => state.userSlice.user);
  const cantidadProductos = useAppSelector(state => state.carritoSlice.carrito);


  if (user.length) {
    return (
      <div className='fixed top-0 w-screen z-50'>
        <nav className={`bg-black text-white flex justify-between items-center p-4 w-full ${styles.navBarUser}`}>
          <div className="flex items-center">

            <div onClick={() => { setMenu(!menu) }} className={styles.button}>
              <div className={`${styles.burger} ${menu ? styles.burgerActive : ""}`}></div>
            </div>

            <AnimatePresence mode='wait'>
              {menu && <MenuModal menu={menu} setMenu={setMenu} />}
            </AnimatePresence>

            <div className=" flex items-center">
              <Link href="/productos" className={`ml-2 ${styles.link}`}>Productos</Link>
            </div>
          </div>

          <SearchProduct />

          <div className="flex items-center">
            {!user[0]?.user?.admin ? (
              <div className="ml-4 flex items-center">
                <button onClick={() => setCarrito(true)} className={`ml-1 text-pink-300 ${styles.link} ${styles.carrito}`}><ShoppingCartOutlinedIcon /></button>
                <div className={`mr-2 ${styles.cantidadCarrito}`}>
                  {cantidadProductos.length}
                </div>
              </div>
            ) : null}


            {user[0]?.user?.admin && (
              <div className="ml-4 flex items-center">
                <Link href='/admin'> <button className={`ml-1 ${styles.link}`}>Admin</button> </Link>
              </div>
            )}
            <div className=" flex items-center">
              <h1 className={`mx-2 ${styles.link}`}>{user[0]?.name}</h1>
            </div>
            <div className=" flex items-center">
              <button onClick={() => setLoggin(true)} className={`text-pink-400 ml-2 ${styles.link}`} ><FaPowerOff /></button>
            </div>
            <Login loggin={loggin} setLoggin={setLoggin} />
            <Link href="/">
              <Image src={corteWorld} alt="CorteWorld" width={70} height={70} className={`${styles.logo} ml-2 mr-4`} />
            </Link>

          </div>
          {/* <MenuModal menu={menu} setMenu={setMenu} /> */}
          <Carrito carrito={carrito} setCarrito={setCarrito} />
        </nav>
      </div>
    );
  }

  return (
    <nav className={`bg-pink-400 text-white flex justify-between items-center p-4 w-full ${styles.navBar}`}>
      <div className="flex items-center">
        <Link href="/" ><Image src={corteWorld} alt="CorteWorld" width={70} height={70} className={`${styles.logo}`} /></Link>
        <div className={styles.home}>
          <Link href="/" className={`ml-4 ${styles.link}`}>Home</Link>
        </div>
      </div>
      <SearchProduct />
      <div className="flex items-center">
        <div className="ml-4 flex items-center">
          <button onClick={() => setCarrito(true)} className={`ml-1 text-pink-400 ${styles.link} ${styles.buttons}`} ><ShoppingCartOutlinedIcon /></button>
        </div>
        <div className="ml-4 flex items-center">
          <Link href="/productos" className={`ml-1 ${styles.link}`}>Productos</Link>
        </div>
        <div className="ml-4 flex items-center">
          <button onClick={() => setLoggin(true)} className={`ml-1 text-pink-400 ${styles.link} ${styles.buttons}`} ><PersonOutlineIcon /></button>
        </div>
      </div>
      <MenuModal menu={menu} setMenu={setMenu} />
      <Login loggin={loggin} setLoggin={setLoggin} />
      <Carrito carrito={carrito} setCarrito={setCarrito} />
    </nav>
  );
};
