export interface TypeCas {
    id_cas?: number,
    type?: string,
    active?: boolean,
    destination: {
        idDestination?: number,
        name?: string
    }
}