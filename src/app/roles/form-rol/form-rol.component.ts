import { PermisoService } from './../../permisos/permiso.service';
import { Permiso } from './../../permisos/permiso';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Rol } from '../rol';
import { RolService } from '../rol.service';

@Component({
	selector: 'app-form-rol',
	templateUrl: './form-rol.component.html',
	styleUrls: ['./form-rol.component.css']
})
export class FormRolComponent implements OnInit {
	rol: Rol = new Rol();
	errores: string[] = [];
	permisosLista: Permiso[] = [];
	dropdownSettings!: IDropdownSettings;

	constructor(private rolService: RolService, private router: Router,
		private permisoService: PermisoService,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
		this.permisoService.getPermisos().subscribe(
			response => this.permisosLista = response as Permiso[]
		)

		this.dropdownSettings = {
			singleSelection: false,
			idField: 'id',
			textField: 'nombre',
			tooltipField: 'descripcion',
			selectAllText: 'Seleccionar Todo',
			searchPlaceholderText: 'Buscar',
			unSelectAllText: 'Desmarcar Todo',
			itemsShowLimit: 5,
			allowSearchFilter: true
		};
		this.cargarRol();
	}

	cargarRol(): void {
		this.activatedRoute.params.subscribe(params => {
			let id = params['id']
			if (id) {
				this.rolService.getRol(id).subscribe(
					(response) => this.rol = response
				)
			}
		})
	}

	public create(): void {
		let nuevoRol: Rol = new Rol();
		nuevoRol.nombre = this.rol.nombre;
		nuevoRol.descripcion = this.rol.descripcion;
		nuevoRol.permisosList = this.rol.permisosList;
		nuevoRol.usuarioList = [];
		this.rolService.createRol(nuevoRol).subscribe(
			response => {
				this.router.navigate(['administracion/roles']);
				Swal.fire({
					position: 'bottom-end',
					icon: 'success',
					title: 'Rol creado',
					text: response.mensaje,
					showConfirmButton: false,
					timer: 3000
				});
			}/* ,
			err =>{
				this.errores = err.error?.errors as string[];
				console.error('Codigo de error desde el backend'+err.status);
				console.error(err.error?.errors);
			}  */
		);
	}

	update(): void {
		this.rolService.updateRol(this.rol).subscribe(
			response => {
				this.router.navigate(['administracion/roles'])
				Swal.fire({
					position: 'bottom-end',
					icon: 'success',
					title: 'Rol actualizado',
					text: response?.mensaje,
					showConfirmButton: false,
					timer: 3000
				})
			}/*,
			err => {
				this.errores = err.error?.errors as string[];
				console.error('Codigo de error desde el backend'+err.status);
				console.error(err.error?.errors);
			}*/
		)
	}

	onItemSelect(item: any) {
		console.log(item);
	}
	onSelectAll(items: any) {
		console.log(items);
	}
}