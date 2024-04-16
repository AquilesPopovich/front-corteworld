'use client'
import React, { useState } from 'react';
import styles from './loggin.module.css';
import { FaTimes, FaGoogle} from 'react-icons/fa';
import Register from '../register/Register';

interface LoginProps {
  loggin: boolean;
  setLoggin: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ loggin, setLoggin }) => {
  if (!loggin) return null;

  const [register, setRegister] = useState(false)

  const handleGoogleLogin = () => {
    // Lógica para iniciar sesión con Google
  };

  const handleSignupClick = () => {
    // Lógica para redirigir a la página de registro
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para enviar datos de inicio de sesión
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.textBlack}>Inicio de Sesión</h2>
        <div className={styles.closeButton} onClick={() => setLoggin(false)}>
          <FaTimes />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Correo Electrónico</label>
            <input className={styles.inputField} type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input className={styles.inputField} type="password" id="password" name="password" required />
          </div>
          <button className={`${styles.submitButton} bg-pink-400 `} type="submit">Iniciar Sesión</button>
        </form>
        <button className={`${styles.submitButton} bg-blue-400 `} onClick={handleGoogleLogin}><FaGoogle className='mr-5' />Iniciar Sesión con Google</button>
        <p>
          ¿No tienes una cuenta? <button className={styles.link} onClick={()=> setRegister(true)}>Regístrate aquí</button>
        </p>
      </div>
      <Register register={register} setRegister={setRegister} />
    </div>
  );
};

export default Login;
