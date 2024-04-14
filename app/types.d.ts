export interface Products {
    id: string
    name: string
    price: number
    stock: number
    category: string
    favorite: boolean
    mark: string
    discount: number
    createdAt: Date
    status: boolean
    carrito: Array
    imgs: Array
    comentarios: Array
}

export type ProductsList = Products[]