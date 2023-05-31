import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Rol } from './rol';

@Injectable({
	providedIn: 'root'
})
export class RolService {

	private urlEndPoint: string = 'http://localhost:8080/api/roles';
	private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private httpClient: HttpClient, private router: Router) { }

	createRol(rol: Rol): Observable<any> {
		return this.httpClient.post<any>(this.urlEndPoint, rol, { headers: this.httpHeaders })
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

	getRoles(): Observable<Rol[]> {
		return this.httpClient.get(this.urlEndPoint).pipe(
			map(response => response as Rol[])
		);
	}

	getRolesPaginado(page: number): Observable<any> {
		return this.httpClient.get(this.urlEndPoint + '/page/' + page).pipe(
			tap((response: any) => {
				//console.log('RolService: tap 1');
				(response.registros as Rol[]).forEach(rol =>
					//console.log(rol.nombre)
					console.log()
				);
			}),
			map((response: any) => {
				(response.registros as Rol[]).map(rol => {
					return rol;
				});
				return response;
			}),
			tap(response => {
				//console.log('RolService: tap 2');
				(response.registros as Rol[]).forEach(rol =>
					//console.log(rol.nombre)
					console.log()
				);
			})
		);
	}

	getRol(id: string): Observable<Rol> {
		return this.httpClient.get<Rol>(`${this.urlEndPoint}/${id}`).pipe(
			catchError(e => {
				this.router.navigate(['/administracion']);
				Swal.fire('Error al editar', e.error.mensaje, 'error');
				return throwError(() => new Error(e));
			})
		);
	}

	updateRol(rol: Rol): Observable<any> {
		return this.httpClient.put<any>(`${this.urlEndPoint}/${rol.id}`, rol, { headers: this.httpHeaders }).pipe(
			catchError(e => {
				if (e.status == 400) {
					return throwError(() => new Error(e));
				}
				Swal.fire('Error al editar Rol', e.error.mensaje, 'error');
				return throwError(() => new Error(e));
			})
		);
	}

	deleteRol(id: string): Observable<Rol> {
		return this.httpClient.delete<Rol>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
			catchError(e => {
				Swal.fire('Error al eliminar Rol', e.error.mensaje, 'error');
				return throwError(() => new Error(e));
			})
		);
	}
}
