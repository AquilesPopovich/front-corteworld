'use client'
import React, { useEffect, useState } from 'react';
import styles from './loggin.module.css';
import { FaTimes, FaGoogle, FaPowerOff } from 'react-icons/fa';
import Register from '../register/Register';
import { agregarUser, logOutUser } from '@/redux/features/userSlice';
import axiosURL from '@/axiosConfig/axiosConfig';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { auth } from '@/app/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteCarrito } from '@/redux/features/carritoSlice';

interface LoginProps {
  loggin: boolean;
  setLoggin: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ loggin, setLoggin }) => {
  if (!loggin) return null;

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userSlice.user);
  const [register, setRegister] = useState(false)
  const [infoUser, setInfoUser] = useState({
    email: '',
    password: ''
  })
  const [userGoogle, setUserGoogle] = useAuthState(auth);

  const googleAuth = new GoogleAuthProvider();

  useEffect(() => {
    console.log(userGoogle)
  }, [userGoogle])

  const googleLogin = async () => {
    try {
      const responseGoogle = await signInWithPopup(auth, googleAuth);

      const response = await axiosURL.get(`/user/email/${responseGoogle?.user?.email}`);
      if (response.status === 200) {

        if (response.data.status === 404) {
          await signOut(auth);
          return window.alert('Este usuario no existe!');
        }

        dispatch(agregarUser(response.data));
        setLoggin(false);
        return window.alert('Sesión iniciada con éxito');
      } else {
        await signOut(auth);
        return window.alert('Este usuario no existe!');
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  const googleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(deleteCarrito());
      dispatch(logOutUser());
      setLoggin(false);
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
      const { data } = await axiosURL.post('/user/login', infoUser);
      if (data) {
        console.log('User registrado', data)
        dispatch(agregarUser(data));
        setInfoUser({ email: '', password: '' })
      }
      setLoggin(false);
    } catch (error: unknown) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  const logOut = async () => {
    try {
      dispatch(deleteCarrito());
      dispatch(logOutUser());
      setLoggin(false)
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    }
  }

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
        <button className={`${styles.submitButton} bg-blue-400 `} onClick={googleLogin} ><FaGoogle className='mr-5' />Iniciar Sesión con Google</button>
        <p>
          ¿No tienes una cuenta?
          <button className={styles.link} onClick={() => {
            setRegister(true)
          }}> Regístrate aquí</button>
        </p>
        {!userGoogle && <button onClick={() => logOut()}><FaPowerOff />Cerrar Sesión</button>}
        {user.length && <button onClick={googleLogout}><FaPowerOff />Cerrar sesión</button>}
      </div>
      <Register register={register} setRegister={setRegister} setLoggin={setLoggin} />
    </div>
  );
};

export default Login;
