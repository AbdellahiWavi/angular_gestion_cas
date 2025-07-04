export interface Incident {
    id?: number,
    decrireAction?: string,
    url?: string,
    county?: string,
    active?: boolean,
    dateCreation?: Date,
    dateTraitement?: Date,
    dernierChEta?: Date,
    status?: string,
    userLocation?: {
        latitude?: number,
        longitude?: number,
    },
    degree?: {
        type_degree?: string
    },
    typeCas?: {
        type?: string,
        destination?: {
            idDestination?: number,
            name?: string
        }
    },
    client?: {
        id?: number,
        username?: string
    },
    gestionnaire?: {
        id?: number
    }
}