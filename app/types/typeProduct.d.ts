export interface Products {
    id: string
    name: string
    price: number
    stock: number
    imgs: array
    category: string
    destacado: boolean
    mark: string
    discount: number
    createdAt: Date
    status: boolean
    talla: string
}

export type ProductsList = Products[]