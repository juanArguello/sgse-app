import { UsuarioService } from './../usuario.service';
import { Credencial } from './credencial';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../usuario';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private token: string | null;
	private usuario!: Usuario | null;

	constructor(private htttpClient: HttpClient, private usuarioService: UsuarioService) { 
		this.token = null;
		this.usuario = null;
	}

	login(credencial: Credencial): Observable<any> {
		return this.htttpClient.post('http://localhost:8080/login', credencial, { observe: 'response' })
			.pipe(map((response: HttpResponse<any>) => {
				const body = response.body;
				const headers = response.headers
				const bearerToken = headers.get('Authorization');
				const token = bearerToken?.replace('Bearer ', '');
				this.token = token!;
				localStorage.setItem('token', token!);
				this.saveUsuario();
				return body;
			}))
	}

	logout():void{
		this.token = null;
		localStorage.removeItem('token');
	}

	saveUsuario(){
		this.usuarioService.getUsuarioByUsername(this.getPayload().sub)
			.subscribe(response => this.usuario = response as Usuario);
	}

	hasRole(role: string): boolean{
		if(this.usuario?.idRol.nombre == role){
			return true;
		}
		return false;
	}

	hasAuthorities(authority: string): boolean{
		let encontrado: boolean = false;
		this.usuario?.idRol.permisosList
			.forEach(permiso => {
				if(permiso.nombre.includes(authority)){
					encontrado = true;
				}
			}
		);
		return encontrado;
	}

	getToken(): String {
		if(this.token != null){
			return this.token;
		}else{
			this.token = localStorage.getItem('token')!;
			return this.token;
		}
	}

	getPayload(): any {
		let token = this.token;
		let payload = token?.split(".")[1];
		let payloadObject = JSON.parse(window.atob(payload!));
		return payloadObject;
	}

	isAuthenticated(): boolean{
		if(this.token != null){
			return true;
		}else{
			return false;
		}
	}

}
