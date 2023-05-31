import { Rol } from './../../roles/rol';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from 'src/app/roles/rol.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-form-usuario',
	templateUrl: './form-usuario.component.html',
	styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit{
	
	usuario: Usuario = new Usuario();
	rolLista!: Observable<Rol[]>;
	//rolLista: Rol[] = [];
	errores: string[] = [];

	constructor(private usuarioService: UsuarioService, private router: Router,
		private rolService: RolService,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
		this.rolLista = this.rolService.getRoles();
		/* this.rolService.getRoles().subscribe(
			response => this.rolLista = response as Rol[]
		) */

		this.cargarUsuario();
	}

	cargarUsuario(): void {
		this.activatedRoute.params.subscribe(params => {
			let id = params['id']
			if (id) {
				this.usuarioService.getUsuario(id).subscribe(
					(response) => this.usuario = response
				)
			}
		})
	}

	public create(): void {
		let nuevoUsuario: Usuario = new Usuario();
		nuevoUsuario.cedula = this.usuario.cedula;
		nuevoUsuario.ruc = this.usuario.ruc;
		nuevoUsuario.nombre = this.usuario.nombre;
		nuevoUsuario.apellido = this.usuario.apellido;
		nuevoUsuario.direccion = this.usuario.direccion;
		nuevoUsuario.telefono = this.usuario.telefono;
		nuevoUsuario.email = this.usuario.email;
		nuevoUsuario.username = this.usuario.username;
		nuevoUsuario.password = this.usuario.password;
		nuevoUsuario.registrarVentaList = [];
		nuevoUsuario.facturaList = [];
		nuevoUsuario.idEmpresa = null;
		nuevoUsuario.idRol = this.usuario.idRol;
		nuevoUsuario.contratoVentaList = [];

		this.usuarioService.createUsuario(nuevoUsuario).subscribe(
			response => {
				this.router.navigate(['administracion/usuarios']);
				Swal.fire({
					position: 'bottom-end',
					icon: 'success',
					title: 'Usuario creado',
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
		this.usuarioService.updateUsuario(this.usuario).subscribe(
			response => {
				this.router.navigate(['administracion/usuarios'])
				Swal.fire({
					position: 'bottom-end',
					icon: 'success',
					title: 'Usuario actualizado',
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
		this.rolService.getRol(item.id).subscribe(
			(rol) => this.usuario.idRol = rol as Rol
		);
		
	}
	
}
