'use client'
import React, { useState } from 'react';
import styles from './loggin.module.css';
import { FaTimes, FaGoogle} from 'react-icons/fa';
import Register from '../register/Register';
import { agregarUser } from '@/redux/features/userSlice';
import { useDispatch } from 'react-redux';
import axiosURL from '@/axiosConfig/axiosConfig';

interface LoginProps {
  loggin: boolean;
  setLoggin: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ loggin, setLoggin }) => {
  if (!loggin) return null;

  const dispatch = useDispatch()

  const [register, setRegister] = useState(false)

  const [infoUser, setInfoUser] = useState({
    email: '',
    password: ''
  })

  const handleGoogleLogin = () => {

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInfoUser({
      ...infoUser,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axiosURL.post('/user/login', infoUser);
      const {data} = response;
      if (data) {
        console.log('User registrado', data)
        dispatch(agregarUser(data));
        setInfoUser({email: '', password: ''})
      }
      setRegister(false)
      setLoggin(false);
    } catch (error: unknown) {
      console.error('Error al registrar el usuario:');
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
            <input className={styles.inputField}
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input className={styles.inputField} type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
            />
          </div>
          <button className={`${styles.submitButton} bg-pink-400 `} type="submit">Iniciar Sesión</button>
        </form>
        <button className={`${styles.submitButton} bg-blue-400 `} onClick={handleGoogleLogin}><FaGoogle className='mr-5' />Iniciar Sesión con Google</button>
        <p>
          ¿No tienes una cuenta?
          <button className={styles.link} onClick={()=> {
            setRegister(true)
          }}>Regístrate aquí</button>
        </p>
      </div>
      <Register register={register} setRegister={setRegister} />
    </div>
  );
};

export default Login;
