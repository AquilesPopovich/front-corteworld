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
    <div className={`fixed top-0 right-0 bottom-0 w-2/5 h-full z-50 flex justify-end text-black ${styles.modalOverlay}`}>
      {!user.length ? (
        <div className=' w-3/4 h-full bg-white p-5 flex flex-col justify-start items-start pt-16'>
          <h2 className='text-black text-2xl font-semibold font-sans'>Inicio de Sesión</h2>
          <div className='fixed right-5 cursor-pointer hover:scale-110' onClick={() => setLoggin(false)}>
            <FaTimes />
          </div>
          <form className='flex flex-col w-full h-3/6 justify-center items-start gap-2' onSubmit={handleSubmit}>
            <label htmlFor="email">Correo Electrónico</label>
            <input className=' w-full h-10 border border-gray-400 rounded-lg'
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
            <label htmlFor="password">Contraseña</label>
            <input className=' w-full h-10 border border-gray-400 rounded-lg mb-3' type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
            />
            <button className='bg-pink-500 text-white rounded p-2 cursor-pointer w-full flex justify-center items-center hover:bg-pink-700 transition-colors' type="submit">Iniciar Sesión</button>
            <button className='bg-blue-500 text-white rounded p-2 cursor-pointer w-full flex justify-center items-center hover:bg-blue-700 transition-colors' onClick={googleLogin} ><FaGoogle className='mr-5' />Iniciar Sesión con Google</button>
          </form>
          <div className='flex flex-col mb-4'>
            <p className=' font-sans'>¿No tienes una cuenta? <hr />
              <button className={styles.link} onClick={() => {
                setRegister(true)
              }}> Regístrate aquí</button>
            </p>
          </div>
          <Register register={register} setRegister={setRegister} setLoggin={setLoggin} />
        </div>
      ) : (
        <div className={`w-2/6 h-1/6 fixed right-0 top-16 -mr-4 flex flex-col justify-evenly items-center ${styles.redButton}`}>
          <div className=' text-white cursor-pointer hover:scale-110' onClick={() => setLoggin(false)}>
            <FaTimes />
          </div>
          {!userGoogle && <button className='bg-red-500 text-white rounded p-2 cursor-pointer w-fit flex justify-center items-center hover:bg-red-700 transition-colors' onClick={() => logOut()}><FaPowerOff />Cerrar Sesión</button>}
          {userGoogle && <button className='bg-red-500 text-white rounded p-2 cursor-pointer w-fit flex justify-center items-center hover:bg-red-700 transition-colors' onClick={googleLogout}><FaPowerOff />Cerrar sesión</button>}
        </div>

      )}
    </div>
  );
};

export default Login;
