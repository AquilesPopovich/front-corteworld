export interface User {
    id: string
    name: string
    email: string
    password: string
    admin: boolean
    direction: string
    status: boolean
}

export type UserList = User[]