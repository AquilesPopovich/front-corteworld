'use client'
import React, { useEffect, useState } from 'react';
import styles from './register.module.css';
import { FaTimes, FaGoogle } from 'react-icons/fa';
import axiosURL from '@/axiosConfig/axiosConfig';
import Login from '../loggin/Login';
import { useDispatch } from 'react-redux';
import { agregarUser } from '@/redux/features/userSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

interface RegisterProps {
  register: boolean;
  setRegister: (value: boolean) => void;
  setLoggin: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ register, setRegister, setLoggin }) => {
  if (!register) return null;

  const dispatch = useDispatch();

  const [login, setLogin] = useState(false)

  const [infoUser, setInfoUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [userGoogle, setUserGoogle] = useAuthState(auth);

  const googleAuth = new GoogleAuthProvider();

  useEffect(() => {
  }, [userGoogle])

  const googleLogin = async () => {
    try {
      const responseGoogle = await signInWithPopup(auth, googleAuth);

      const response = await axiosURL.get(`/user/email/${responseGoogle?.user?.email}`);
      if(response.data.status === 404){
        const { data } = await axiosURL.post('/user/google', {name: responseGoogle?.user?.displayName, email: responseGoogle?.user?.email});
        if(data){
          dispatch(agregarUser(data))
        }
        setRegister(false);
        setLogin(false);
        window.alert('Usuario registrado!')
      } else {
        await signOut(auth);
        return window.alert('Este usuario ya existe!')
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

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
      const { data } = response;
      if (data) {
        console.log('Usuario creado:', data);
        dispatch(agregarUser(data));
        setInfoUser({ name: '', email: '', password: '' })
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
        <div className={styles.closeButton} onClick={() => { setRegister(false) }}>
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
        <button className={`${styles.submitButton} bg-blue-400 `} onClick={googleLogin} ><FaGoogle className='mr-5' />Regístrate con Google</button>
        <p>
          ¿Ya tienes una cuenta? <button className={styles.link} onClick={() => {
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
