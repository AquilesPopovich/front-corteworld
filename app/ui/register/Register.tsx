'use client'
import React, { useState } from 'react';
import styles from './register.module.css';
import { FaTimes, FaGoogle} from 'react-icons/fa';
import axios from 'axios';
import Login from '../loggin/Login';
import { useDispatch } from 'react-redux';
import { agregaruser } from '@/redux/features/userSlice';

interface RegisterProps {
  register: boolean;
  setRegister: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ register, setRegister }) => {
  if (!register) return null;
  
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false)


  const handleGoogleRegister = () => {

  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await axios.post('https://corteworld.onrender.com/user', formData);
      const data = response.data;
      if (data) {
        console.log('Usuario creado:', data);
        dispatch(agregaruser(data));
      }
      setLogin(false);
      setRegister(false)
    } catch (error: unknown) {
      console.error('Error al loguear el usuario:');
    }
  };
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.textBlack}>Registrate aqui</h2>
        <div className={styles.closeButton} onClick={() => {setRegister(false)}}>
          <FaTimes />
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Nombre</label>
            <input className={styles.inputField} type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Correo Electrónico</label>
            <input className={styles.inputField} type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input className={styles.inputField} type="password" id="password" name="password" required />
          </div>
          <button className={`${styles.submitButton} bg-pink-400 `} type="submit">Registrarse</button>
        </form>
        <button className={`${styles.submitButton} bg-blue-400 `} onClick={handleGoogleRegister}><FaGoogle className='mr-5' />Iniciar Sesión con Google</button>
        <p>
          ¿Ya tienes una cuenta? <button className={styles.link} onClick={()=>{
            setLogin(true)
            setRegister(false)
          }}>Logueate aquí</button>
        </p>
      </div>
      <Login loggin={login} setLoggin={setLogin} />
    </div>
  );
};

export default Register;
