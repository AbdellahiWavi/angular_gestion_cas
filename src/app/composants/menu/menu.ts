export interface Menu {
    id?: string;
    titre?: string;
    icon?: any;
    url?: string;
    sousMenu?: Array<Menu>
}