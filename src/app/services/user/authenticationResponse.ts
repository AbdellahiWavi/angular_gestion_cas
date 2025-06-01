import { Role } from "../../../gs-api/roles/role"

export interface AuthenticationResponse {
    accessToken: string,
    userInfo: {
        id?: number,
        username?: string,
        emailOrTel?: string,
        role: [{ authority: string }]
    }
}