import { Role } from "../../../gs-api/roles/role"

export interface AuthenticationResponse {
    accessToken: string,
    userInfo: {
        id: number,
        username: string,
        emailOrTel: string,
        active: boolean,
        role: [{ authority: string }]
    }
}