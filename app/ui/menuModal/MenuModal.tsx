'use client'
import Link from 'next/link';
import styles from './menuModal.module.css';
import { FaStar, FaHistory, FaPowerOff, FaTimes } from 'react-icons/fa';

interface MenuModalProps {
  menu: boolean;
  setMenu: (value: boolean) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ menu, setMenu }) => {
  if (!menu) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
      <h2 className='text-black'>Menu</h2>
        <div className={styles.closeButton} onClick={() => setMenu(false)}>
          <FaTimes />
        </div>
        <div className={styles.menuLinks}>
          <Link href="/favoritos" passHref>
            <div className={styles.link}>
              <FaStar className={styles.icon} /> Favoritos
            </div>
          </Link>
          <Link href="/historial" passHref>
            <div className={styles.link}>
              <FaHistory className={styles.icon} /> Historial
            </div>
          </Link>
        </div>
        <div className={styles.logoutButton} onClick={() => console.log('Logout clicked')}>
          <FaPowerOff className={styles.icon} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
