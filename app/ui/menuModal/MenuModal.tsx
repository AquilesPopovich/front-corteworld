'use client'
import styles from './style.module.scss';
import { FaStar, FaHistory, FaPowerOff, FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { logOutUser } from '@/redux/features/userSlice';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuSlide } from '../menu/Anim';
import Link from '../link/index';

interface MenuModalProps {
  menu: boolean;
  setMenu: (value: boolean) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ menu, setMenu }) => {
  if (!menu) return null;
  const user = useAppSelector(state => state.userSlice.user);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  const navItems = [

    {

      title: "Favoritos",

      href: "/favoritos",

    },

    {

      title: "Historial",

      href: `/historial/${user[0]?.user?.id}`,

    },
  ]

  const logOut = async () => {
    try {
      dispatch(logOutUser());
      setMenu(false)
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >

      <div className={styles.body}>
          <div onMouseLeave={() => { setSelectedIndicator(pathname) }} className={styles.nav}>
            <div className={styles.header}>
              <p>Menu</p>
            </div>
            {
              navItems.map((data, index) => {
                return <Link
                  key={index}
                  data={{ ...data, index }}
                  isActive={selectedIndicator == data.href}
                  setSelectedIndicator={setSelectedIndicator}>
                </Link>
              })
            }
          </div>
          <button onClick={() => logOut()}>
            LogOut
            <FaPowerOff className={styles.icon} />
          </button>
      </div>
    </motion.div>
  );
};

export default MenuModal;
