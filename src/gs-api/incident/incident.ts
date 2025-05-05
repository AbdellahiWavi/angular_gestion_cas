export interface Incident {
    id?: number,
    decrireAction?: string,
    url?: string,
    active?: boolean,
    dateCreation?: Date,
    dateTraitement?: Date,
    dernierChEta?: Date,
    status?: string,
    place?: {
        lat?: string,
        lon?: string,
        city?: string
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