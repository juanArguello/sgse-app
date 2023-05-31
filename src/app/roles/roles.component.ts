import { ModalService } from '../services/modal.service';
import { Permiso } from './../permisos/permiso';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Rol } from './rol';
import { RolService } from './rol.service';

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{
	roles: Rol[] = [];
	permisos: Permiso[] = [];
	paginador: any;
	rolSeleccionado!: Rol;

	constructor(private rolService: RolService, private modalService: ModalService) {}

	ngOnInit(): void {
		this.rolService.getRoles().subscribe(
			roles => this.roles = roles);
		/*this.activatedRoute.paramMap.subscribe(params => {
			let page: number = +params.get('page')!;

			if (!page) {
				page = 1;
			}

			this.rolService.getRolesPaginado(page)
				.pipe(
					tap(response => {
						//console.log('PermisosComponent: tap 3');
						(response.registros as Rol[]).forEach(rol => 
							//console.log(rol.nombre)
							console.log()
							);
					})
				).subscribe(response => {
					this.roles = response.registros as Rol[];
					this.paginador = response;
				});
		});*/
	}

	delete(rol: Rol): void {
		Swal.fire({
			title: 'Estas seguro?',
			text: `¿Seguro que desea eliminar el rol ${rol.nombre}?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar'
		}).then((result) => {
			if (result.isConfirmed) {
				this.rolService.deleteRol(rol.id.toString()).subscribe(
					response => {
						this.roles = this.roles.filter(per => per !== rol)
						Swal.fire({
							title: 'Rol Eliminado!',
							text: `Rol ${rol.nombre} eliminado con exito.`,
							icon: 'success',
							showConfirmButton: false,
							timer: 2000
						}

						)
					}
				)

			}
		});
	}

	openModal(rol: Rol){
		this.rolSeleccionado = rol;
		this.modalService.abrirModal();
	}
}
