'use client'
import React, { useState } from 'react';
import styles from './loggin.module.css';
import { FaTimes, FaGoogle} from 'react-icons/fa';
import Register from '../register/Register';
import { agregaruser } from '@/redux/features/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

interface LoginProps {
  loggin: boolean;
  setLoggin: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ loggin, setLoggin }) => {
  if (!loggin) return null;

  const dispatch = useDispatch()

  const [register, setRegister] = useState(false)

  const handleGoogleLogin = () => {

  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await axios.post('/user/login', formData);
      const data = response.data;
      if (data) {
        console.log('Usuario logueado:', data);
        dispatch(agregaruser(data));
      }
      setLoggin(false);
      setRegister(false)
    } catch (error: unknown) {
      console.error('Error al loguear el usuario:');
    }
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
          ¿No tienes una cuenta? <button className={styles.link} onClick={()=> {
            setRegister(true)
            setLoggin(false)
          }}>Regístrate aquí</button>
        </p>
      </div>
      <Register register={register} setRegister={setRegister} />
    </div>
  );
};

export default Login;
