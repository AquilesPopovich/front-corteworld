'use client'
import styles from './style.module.scss';
import { useAppSelector } from '@/redux/hook';
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
      </div>
    </motion.div>
  );
};

export default MenuModal;
