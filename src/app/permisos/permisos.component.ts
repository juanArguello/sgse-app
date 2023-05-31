import { PermisoService } from './permiso.service';
import { Component, OnInit } from '@angular/core';
import { Permiso } from './permiso';
import Swal from 'sweetalert2';
import { tap, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-permisos',
	templateUrl: './permisos.component.html',
	styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

	permisos: Permiso[] = [];
	paginador: any;

	constructor(private permisoService: PermisoService, private activatedRoute: ActivatedRoute) {

	}

	ngOnInit(): void {
		/*this.permisoService.getPermisos().subscribe(
			permisos => this.permisos = permisos);*/
		this.activatedRoute.paramMap.subscribe(params => {
			let page: number = +params.get('page')!;
		
			if (!page) {
				page = 1;
			}

			this.permisoService.getPermisosPaginado(page)
				.pipe(
					tap(response => {
						//console.log('PermisosComponent: tap 3');
						(response.registros as Permiso[]).forEach(permiso => 
							//console.log(permiso.nombre)
							console.log()
							);
					})
				).subscribe(response => {
					this.permisos = response.registros as Permiso[];
					this.paginador = response;
				});
		});
	}

	delete(permiso: Permiso): void {
		Swal.fire({
			title: 'Estas seguro?',
			text: `¿Seguro que desea eliminar el permiso ${permiso.nombre}?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar'
		}).then((result) => {
			if (result.isConfirmed) {
				this.permisoService.deletePermiso(permiso.id.toString()).subscribe(
					response => {
						this.permisos = this.permisos.filter(per => per !== permiso)
						Swal.fire({
							title: 'Permiso Eliminado!',
							text: `Permiso ${permiso.nombre} eliminado con exito.`,
							icon: 'success',
							showConfirmButton: false,
							timer: 2000
						}

						)
					}
				)

			}
		})
	}

}
