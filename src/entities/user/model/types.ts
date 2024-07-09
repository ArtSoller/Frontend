export interface User {
    id: string
    username: string
    email: string
    roles: string[]
}

export interface UserState {
    data: User | null
    access_token: string | null
}

export interface DecodedToken {
    iat: number
    exp: number
    roles: string[]
    expires_in: string
    user_id: string
    email: string
    username: string
}