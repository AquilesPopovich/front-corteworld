import React from 'react'
import styles from './loggin.module.css'
import { FaTimes } from 'react-icons/fa';

interface LoginProps {
    loggin: boolean;
    setLoggin: (value: boolean) => void;
  }

const Login: React.FC<LoginProps> = ({ loggin, setLoggin }) => {

    if(!loggin) return null

    return (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
          <h2 className='text-black'>Loggin</h2>
            <div className={styles.closeButton} onClick={() => setLoggin(false)}>
              <FaTimes />
            </div>
            </div>
        </div>
      );
}

export default Login