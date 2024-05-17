import { Comentario, ComentarioList } from "@/app/types/typeComentario"
import axiosURL from "@/axiosConfig/axiosConfig"
import { useEffect, useState } from "react"
import styles from './comentariosUser.module.css';

interface Props {
    userId: string
    comentarios: string[]
    setComentarios: React.Dispatch<React.SetStateAction<string[]>>
}

const ComentariosUsers: React.FC<Props> = ({ userId, comentarios, setComentarios }) => {
    if (!comentarios.includes(userId)) return null;

    const [comentariosUser, setComentariosUser] = useState<ComentarioList>([])

    useEffect(() => {
        const verComentarios = async () => {
            try {
                const { data } = await axiosURL(`/comentarios/user/${userId}`)
                if (data) setComentariosUser(data)
            } catch (error: any) {
                if (error instanceof Error) console.log(error.message)
            }
        }
        verComentarios();
    }, [userId])
    console.log(comentariosUser)

    return (
        <div>
            <div className={`fixed flex flex-col justify-start items-start gap-6 top-40 right-96 w-2/4 h-3/5 bg-slate-100 p-14 z-10 overflow-y-auto rounded ${styles.container}`}>
                {comentariosUser.length ? comentariosUser.map((comentario: Comentario) => (
                    <div key={comentario.id} className={`flex justify-between w-full h-fit text-lg border-b-2 border-black border-dashed flex-wrap ${styles.comentarioContainer}`}>
                        <h3 className={`w-3/4 break-words font-semibold ${styles.comentario}`}>Comentario: {comentario.comentario}</h3>
                        <p>{new Date(comentario.date).toLocaleDateString()}</p>
                    </div>
                )) : (
                    <p className={`text-lg`}>No hay comentarios</p>
                )}
                <button className=' bg-pink-200 rounded-md hover:bg-pink-400' onClick={() => setComentarios([])}>Cancelar</button>
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-gray-600 opacity-90`}></div>
        </div>
    )
}

export default ComentariosUsers;