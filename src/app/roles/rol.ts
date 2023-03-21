import { Usuario } from './../usuarios/usuario';
import { Permiso } from "../permisos/permiso";

export class Rol {
    id!: number;
    nombre!: string;
    descripcion!: string;
    permisosList!: Permiso[];
    usuarioList!: Usuario[];
}
