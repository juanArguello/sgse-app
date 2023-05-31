import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	private urlEndPoint: string = environment.API_BASE_URL + 'usuarios';
	private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private httpClient: HttpClient, private router: Router) { }

	createUsuario(usuario: Usuario): Observable<any> {
		return this.httpClient.post<any>(this.urlEndPoint, usuario, { headers: this.httpHeaders })
			.pipe(
				catchError(e => {
					if (e.status == 400) {
						return throwError(() => new Error(e));
					}
					Swal.fire(e.error.mensaje, e.error.error, 'error');
					return throwError(() => new Error(e));
				})
			);
	}

	getUsuarios(): Observable<Usuario[]> {
		return this.httpClient.get(this.urlEndPoint).pipe(
			map(response => response as Usuario[])
		);
	}

	getUsuariosPaginado(page: number): Observable<any> {
		return this.httpClient.get(this.urlEndPoint + '/page/' + page).pipe(
			tap((response: any) => {
				//console.log('UsuarioService: tap 1');
				(response.registros as Usuario[]).forEach(usuario =>
					//console.log(usuario.nombre)
					console.log()
				);
			}),
			map((response: any) => {
				(response.registros as Usuario[]).map(usuario => {
					return usuario;
				});
				return response;
			}),
			tap(response => {
				//console.log('UsuarioService: tap 2');
				(response.registros as Usuario[]).forEach(usuario =>
					//console.log(usuario.nombre)
					console.log()
				);
			})
		);
	}

	getUsuario(id: string): Observable<Usuario> {
		return this.httpClient.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
			catchError(e => {
				this.router.navigate(['/administracion']);
				Swal.fire('Error al editar', e.error.mensaje, 'error');
				return throwError(() => new Error(e));
			})
		);
	}

	getUsuarioByUsername(nombreUsuario: string): Observable<Usuario> {
		return this.httpClient.get<Usuario>(`${this.urlEndPoint}/username=${nombreUsuario}`).pipe(
			catchError(e => {
				return throwError(() => new Error(e));
			})
		);
	}

	updateUsuario(usuario: Usuario): Observable<any> {
		return this.httpClient.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario, { headers: this.httpHeaders })
		.pipe(
			catchError(e => {
				if (e.status == 400) {
					return throwError(() => new Error(e));
				}
				Swal.fire('Error al editar Usuario', e.error.mensaje, 'error');
				return throwError(() => new Error(e));
			})
		);
	}

	deleteUsuario(id: string): Observable<Usuario> {
		return this.httpClient.delete<Usuario>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders })
		.pipe(
			catchError(e => {
				Swal.fire('Error al eliminar Usuario', e.error.mensaje, 'error');
				return throwError(() => new Error(e));
			})
		);
	}
}
