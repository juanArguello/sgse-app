import { Rol } from './../roles/rol';
export class Usuario {
    id!: number;
    cedula!: number;
    ruc!: string;
    nombre!: string;
    apellido!: string;
    direccion!: string;
    telefono!: string;
    email!: string;
    fechaIngreso!: Date;
    enabled!: boolean;
    username!: string;
    password!: string;
    registrarVentaList!: any[];
    facturaList!: any[];
    idEmpresa!: any;
    idRol!: Rol;
    contratoVentaList!: any[];
}
