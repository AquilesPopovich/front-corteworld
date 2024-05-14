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
      const regexEmail = /^[a-zA-Z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-zA-Z0-9])*@gmail\.com$/;
      if(!regexEmail.test(infoUser.email)) {
        window.alert('Este email no es válido!')
        return null;
      }
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
    <div className={`fixed top-0 right-0 bottom-0 w-full h-full z-50 flex justify-end text-black ${styles.modalOverlay}`}>
      <div className=' w-3/4 h-full bg-white p-5 flex flex-col justify-start items-start pt-16'>
        <h2 className='text-black text-2xl font-semibold font-sans mb-1'>Registrate aquí</h2>
        <div className='fixed right-5 cursor-pointer hover:scale-110' onClick={() => { setRegister(false) }}>
          <FaTimes />
        </div>
        <form className='flex flex-col w-full h-3/6 justify-center items-start gap-2' onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre</label>
            <input className=' w-full h-10 border border-gray-400 rounded-lg'
              type="text"
              id="name"
              name="name"
              value={infoUser.name}
              required
              onChange={handleChange}
            />
            <label htmlFor="email">Correo Electrónico</label>
            <input className=' w-full h-10 border border-gray-400 rounded-lg'
              type="email"
              id="email"
              name="email"
              value={infoUser.email}
              required
              onChange={handleChange}
            />
            <label htmlFor="password">Contraseña</label>
            <input className=' w-full h-10 border border-gray-400 rounded-lg mb-3'
              type="password"
              id="password"
              name="password"
              value={infoUser.password}
              required
              onChange={handleChange}
            />
          <button className='bg-pink-500 text-white rounded p-2 cursor-pointer w-full flex justify-center items-center hover:bg-pink-700 transition-colors' type="submit">Registrarse</button>
        </form>
        <button className='bg-blue-500 text-white rounded p-2 cursor-pointer w-full flex justify-center items-center hover:bg-blue-700 transition-colors' onClick={googleLogin} ><FaGoogle className='mr-5' />Regístrate con Google</button>
        <div className='flex flex-col mt-4'>
        <p className='font-sans'>
          ¿Ya tienes una cuenta? <hr /> <button className={styles.link} onClick={() => {
            setLogin(true)
            setRegister(false)
          }}>Logueate aquí</button>
        </p>
        </div>
      </div>
      <Login loggin={login} setLoggin={setLogin} />
    </div>
  );
};

export default Register;
