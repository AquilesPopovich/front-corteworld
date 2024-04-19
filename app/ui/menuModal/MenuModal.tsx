'use client'
import Link from 'next/link';
import styles from './menuModal.module.css';
import { FaStar, FaHistory, FaPowerOff, FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { logOutUser } from '@/redux/features/userSlice';

interface MenuModalProps {
  menu: boolean;
  setMenu: (value: boolean) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ menu, setMenu }) => {
  if (!menu) return null;

  const dispatch = useAppDispatch();

  const logOut = async() => {
    try {
      dispatch(logOutUser());
    } catch (error) {
      if (error instanceof Error) throw Error(error.message)
    }
  }

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
        <div className={styles.logoutButton} onClick={() => logOut()}>
          <FaPowerOff className={styles.icon} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
