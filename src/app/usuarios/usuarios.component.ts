import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

	usuarios: Usuario[] = [];
	paginador: any;

	constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) {

	}

	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe(params => {
			let page: number = +params.get('page')!;
		
			if (!page) {
				page = 1;
			}

			this.usuarioService.getUsuariosPaginado(page)
				.pipe(
					tap(response => {
						//console.log('UsuarioComponent: tap 3');
						(response.registros as Usuario[]).forEach(usuario => 
							//console.log(usuario.nombre)
							console.log()
							);
					})
				).subscribe(response => {
					this.usuarios = response.registros as Usuario[];
					this.paginador = response;
				});
		});
	}

	delete(usuario: Usuario): void {
		Swal.fire({
			title: 'Estas seguro?',
			text: `¿Seguro que desea eliminar el usuario ${usuario.nombre}?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar'
		}).then((result) => {
			if (result.isConfirmed) {
				this.usuarioService.deleteUsuario(usuario.id.toString()).subscribe(
					response => {
						this.usuarios = this.usuarios.filter(per => per !== usuario)
						Swal.fire({
							title: 'Usuario Eliminado!',
							text: `Usuario ${usuario.nombre} eliminado con exito.`,
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
