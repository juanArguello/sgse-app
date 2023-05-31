import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AdministracionService } from './administracion.service';

@Component({
    selector: 'app-administracion',
    templateUrl: './administracion.component.html',
    styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

    tituloCabecera: string = 'Panel Administrativo';
    cantidadPermisos!: number;
    cantidadRoles!: number;
    cantidadUsuarios!: number;

    constructor(private administracionService: AdministracionService) { }

    ngOnInit(): void {
        this.administracionService.getCantidadPermisos().subscribe(
            response => this.cantidadPermisos = response);
        this.administracionService.getCantidadRoles().subscribe(
            response => this.cantidadRoles = response);
        this.administracionService.getCantidadUsuarios().subscribe(
            response => this.cantidadUsuarios = response);
            console.log(this.cantidadPermisos);
            
    }

   /* ngOnChanges(changes: SimpleChanges): void {
        let cantidadPermisosActual = changes['cantidadPermisos'];
        let cantidadRolesActual = changes['cantidadRoles'];
        let cantidadUsuariosActual = changes['cantidadUsuarios'];
        if (cantidadPermisosActual.previousValue) {
            this.administracionService.getCantidadPermisos().subscribe(
                response => this.cantidadPermisos = response);
        } else if (cantidadRolesActual.previousValue) {
            this.administracionService.getCantidadRoles().subscribe(
                response => this.cantidadRoles = response);
        } else if (cantidadUsuariosActual.previousValue) {
            this.administracionService.getCantidadUsuarios().subscribe(
                response => this.cantidadUsuarios = response);
        }
    }*/


}
