export interface Incident {
    id?: number,
    decrireAction?: string,
    url?: string,
    dateCreation?: Date,
    status?: Enumerator,
    place?: number,
    degree?: number,
    typeCas?: number,
    client?: number,
    gestionnaire?: number
}