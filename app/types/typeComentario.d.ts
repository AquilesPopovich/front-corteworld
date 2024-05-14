import { ProductsList } from "./typeProduct"
import { UserList } from "./typeUser"

export interface Comentario {
    id: string
    comentario: string
    date: Date
    user: UserList
    producto: ProductsList
}

export type ComentarioList = Comentario[]