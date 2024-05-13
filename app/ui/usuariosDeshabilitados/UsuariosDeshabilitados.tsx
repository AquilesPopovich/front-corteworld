'use client'
import axiosURL from '@/axiosConfig/axiosConfig'
import { getAllProducts } from '@/redux/features/productsSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const UsuariosDeshabilitados = ({id, name, email, mostrarUsuarios, setMostrarUsuarios}: {id:string, name: string, email:string, mostrarUsuarios: boolean, setMostrarUsuarios: (value: boolean) => void}) => {

    if(!mostrarUsuarios) return null;

    const dispatch= useDispatch()

    const [comentariosUser, setComentariosUser] = useState([])

    const habilitarUser = async() =>{
        try {
            const {data} = await axiosURL.patch(`/user/${id}`, {status: true})
            if(data) dispatch(getAllProducts())
        } catch (error) {
            if(error instanceof Error) console.log(error.message)
        }
    }

    const verComentarios = async() =>{
        try {
            const {data} = await axiosURL(`/comentarios/${id}`)
            if(data) setComentariosUser(data)
        } catch (error: any) {
            console.log(error.message)
            
        }
    }


  return (
    <div className={`fixed flex justify-start items-center h-3/4 w-3/6 left-1/4 bottom-10 border-solid rounded-lg bg-slate-50 p-4 `}>
        <p>nombre: {name}</p>
        <p>email: {email}</p>
        <button onClick={()=> habilitarUser()}>habilitar</button>
        <button onClick={()=> verComentarios()}>ver comentarios</button>
        {comentariosUser?.map((comentario: any) => (
            <>
                <p>Fecha: {comentario?.date}</p>

                <p>Comentario: {comentario?.comentario}</p>
            </>
        ))}
        <button onClick={() => setMostrarUsuarios(false)}>Cancelar</button>
    </div>
  )
}

export default UsuariosDeshabilitados