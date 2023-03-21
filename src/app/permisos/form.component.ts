import { PermisoService } from './permiso.service';
import { Permiso } from './permiso';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	permiso: Permiso = new Permiso();
	errores: string[] = [];

	constructor(private permisoService: PermisoService, private router: Router, private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
		this.cargarPermiso();
	}

	cargarPermiso(): void {
		this.activatedRoute.params.subscribe(params => {
			let id = params['id']
			if (id) {
				this.permisoService.getPermiso(id).subscribe(
					(permiso) => this.permiso = permiso
				)
			}
		})
	}

	public create(): void {
		this.permisoService.createPermiso(this.permiso).subscribe(
			response => {
				this.router.navigate(['/administracion']);
				Swal.fire({
					position: 'bottom-end',
					icon: 'success',
					title: 'Permiso creado',
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
		this.permisoService.updatePermiso(this.permiso).subscribe(
			response => {
				this.router.navigate(['/administracion'])
				Swal.fire({
					position: 'bottom-end',
					icon: 'success',
					title: 'Permiso actualizado',
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
}
