export interface Menu {
    id?: string;
    titre?: string;
    icon?: any;
    url?: string;
    userRole?: string[];
    sousMenu?: Array<Menu>
}