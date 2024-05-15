import { Comentario, ComentarioList } from "@/app/types/typeComentario"
import axiosURL from "@/axiosConfig/axiosConfig"
import { useEffect, useState } from "react"

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
            {comentariosUser.length ? comentariosUser.map((comentario: Comentario) => (
                <div key={comentario.id} className={`flex`}>
                    <h3>{comentario.comentario}</h3>
                    <p>{new Date(comentario.date).toLocaleDateString()}</p>
                </div>
            )) : (
                <p>No hay comentarios</p>
            )}
            <button onClick={() => setComentarios([])}>Cancelar</button>
        </div>
    )
}

export default ComentariosUsers;