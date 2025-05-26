import { Role } from "../roles/role";

export interface Gestionnaire {
    id?: number,
    username?: string,
    email?: string,
    password?: string,
    active?: boolean,
    roles?: Role[]
}