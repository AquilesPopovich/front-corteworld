'use client'
import React, { useState } from 'react';
import styles from './register.module.css';
import { FaTimes, FaGoogle} from 'react-icons/fa';
import axiosURL from '@/axiosConfig/axiosConfig';
import Login from '../loggin/Login';
import { useDispatch } from 'react-redux';
import { agregarUser } from '@/redux/features/userSlice';

interface RegisterProps {
  register: boolean;
  setRegister: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ register, setRegister }) => {
  if (!register) return null;
  
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false)

  const [infoUser, setInfoUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleGoogleRegister = () => {

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
      const response = await axiosURL.post('/user', infoUser);
      const {data} = response;
      if (data) {
        console.log('Usuario creado:', data);
        dispatch(agregarUser(data));
        setInfoUser({name: '', email: '', password: ''})
      }
      setRegister(false)
      setLogin(false);
    } catch (error: unknown) {
      console.error('Error al registrar el usuario:');
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
            <input className={styles.inputField}
            type="text"
            id="name"
            name="name"
            value={infoUser.name}
            required
            onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Correo Electrónico</label>
            <input className={styles.inputField}
            type="email"
            id="email"
            name="email"
            value={infoUser.email}
            required
            onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input className={styles.inputField}
            type="password"
            id="password"
            name="password"
            value={infoUser.password}
            required
            onChange={handleChange}
            />
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
