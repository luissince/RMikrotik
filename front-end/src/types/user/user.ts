import type { Rol } from "./rol";

export interface User {
    id: string;
    email: string;
    image: string;
    name: string;
    providerId: string;
    status: string;
    rol: Rol;
}