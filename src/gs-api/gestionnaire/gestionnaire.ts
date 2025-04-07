
export interface Gestionnaire {
    id?: number,
    username?: string,
    email?: string,
    password?: string,
    roles: [
        {
            id?: number,
            role?: string,
            profile?: string
        }
    ]
}