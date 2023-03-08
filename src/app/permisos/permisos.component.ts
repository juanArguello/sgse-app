import { PermisoService } from './permiso.service';
import { Component, OnInit } from '@angular/core';
import { Permiso } from './permiso';

@Component({
	selector: 'app-permisos',
	templateUrl: './permisos.component.html',
	styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

	permisos: Permiso[] = [];

	constructor(private permisoService: PermisoService){

	}

	ngOnInit(): void {
		this.permisoService.getPermisos().subscribe(
			permisos => this.permisos= permisos
		);
	}

}
