'use client'
import axiosURL from '@/axiosConfig/axiosConfig'
import { getAllProducts } from '@/redux/features/productsSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const UsuariosDeshabilitados = ({id, name, email}: {id:string, name: string, email:string}) => {

    const dispatch= useDispatch()

    const [comentariosUser, setComentariosUser] = useState([])

    const habilitarUser = async() =>{
        try {
            const {data} = await axiosURL.patch(`/user/${id}`, {status: true})
            if(data) dispatch(getAllProducts())
        } catch (error: any) {
            console.log(error.message)
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
    <div>
        <p>nombre: {name}</p>
        <p>email: {email}</p>
        <button onClick={()=> habilitarUser()}>habilitar</button>
        <button onClick={()=> verComentarios()}>ver comentarios</button>
        {comentariosUser?.map((comentario) => (
            <>
                <p>Fecha: {comentario.date}</p>

                <p>Comentario: {comentario.comentario}</p>
            </>
        ))}
    </div>
  )
}

export default UsuariosDeshabilitados