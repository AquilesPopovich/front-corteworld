'use client'
import { UserList } from '@/app/types/typeUser'
import axiosURL from '@/axiosConfig/axiosConfig'
import { getAllUsers } from '@/redux/features/userSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ComentariosUsers from '../ComentariosUser/ComentariosUser'
import styles from './usuarios.module.css';

interface Props {
    usuarios: UserList
    mostrarUsuarios: boolean
    setMostrarUsuarios: (value: boolean) => void
}

const UsuariosDeshabilitados: React.FC<Props> = ({ usuarios, mostrarUsuarios, setMostrarUsuarios }) => {

    if (!mostrarUsuarios) return null;
    const [comentarios, setComentarios] = useState<string[]>([]);
    const dispatch = useDispatch()

    const habilitarUser = async (cb: string, id:string) => {
        try {
            if (cb === 'yes') {
                const { data } = await axiosURL.patch(`/user/${id}`, { status: true })
                if (data) {dispatch(getAllUsers()); console.log(data)}
            } else if (cb === 'no') {
                const { data } = await axiosURL.patch(`/user/${id}`, { status: false })
                if (data) {dispatch(getAllUsers()); console.log(data)}
            }
        } catch (error) {
            if (error instanceof Error) console.log(error.message)
        }
    }

    return (
        <div className={`fixed flex flex-row flex-wrap justify-start gap-4 items-center h-3/4 w-3/4 left-80 bottom-10 border-solid rounded-lg bg-slate-50 p-4 overflow-y-auto ${styles.container}`}>
            {usuarios?.map((user) => (
                <div key={user.id} className={`flex flex-col items-center justify-evenly border-2 rounded-md border-black bg-gray-100 h-4/6 w-1/4 ${styles.cardUser}`}>
                    <h1 className={` text-2xl font-medium ${styles.name}`}>{user.name}</h1>
                    <p className={styles.email}>{user.email}</p>
                    {user.direction ? (<p>{user.direction}</p>) : (null)}
                    {user.status ? (<h3 className={`font-medium ${styles.status}`}>Estado: Verdadero</h3>) : (<h3 className={`font-medium ${styles.status}`}>Estado: Falso</h3>)}
                    <button className={`bg-pink-200 rounded-md hover:bg-pink-400 ${styles.buttons}`} onClick={() => habilitarUser('yes', `${user.id}`)}>Habilitar Usuario</button>
                    <button className={`bg-pink-200 rounded-md hover:bg-pink-400 ${styles.buttons}`} onClick={() => habilitarUser('no', `${user.id}`)}>Deshabilitar Usuario</button>
                    <button className={`bg-pink-200 rounded-md hover:bg-pink-400 ${styles.buttons}`} onClick={() => setComentarios([user.id])}>Ver Comentarios</button>
                    {comentarios.includes(user.id) && (
                        <ComentariosUsers userId={user.id} comentarios={comentarios} setComentarios={setComentarios} />
                    )}
                </div>
            ))}
            <button className={`bg-pink-200 rounded-md hover:bg-pink-400 ${styles.buttons}`} onClick={() => setMostrarUsuarios(false)}>Cancelar</button>
        </div>
    )
}

export default UsuariosDeshabilitados