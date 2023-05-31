import { environment } from './../../environments/environment.development';
import { Permiso } from './permiso';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class PermisoService {

	private urlEndPoint: string = environment.API_BASE_URL+'permisos';
	private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private httpClient: HttpClient, private router: Router) { }

	createPermiso(permiso: Permiso): Observable<any> {
		return this.httpClient.post<any>(this.urlEndPoint, permiso, { headers: this.httpHeaders })
		 .pipe(
			catchError(e => {
				if (e.status == 400) {
					Swal.fire(e.error.mensaje, e.error.error, 'error');
					return throwError(() => new Error(e));
				}
				Swal.fire(e.error.mensaje, e.error.error, 'error');
				return throwError(() => new Error(e));
			})
		);
	}

	getPermisos(): Observable<Permiso[]> {
		return this.httpClient.get(this.urlEndPoint).pipe(
			map(response => response as Permiso[])
		);
	}

	getPermisosPaginado(page: number): Observable<any> {
		return this.httpClient.get(this.urlEndPoint + '/page/' + page).pipe(
			tap((response: any) => {
				//console.log('PermisoService: tap 1');
				(response.registros as Permiso[]).forEach(permiso =>
					//console.log(permiso.nombre)
					console.log()
					);
			}),
			map((response: any) => {
				(response.registros as Permiso[]).map(permiso => {
					return permiso;
				});
				return response;
			}),
			tap(response => {
				//console.log('PermisoService: tap 2');
				(response.registros as Permiso[]).forEach(permiso =>
					//console.log(permiso.nombre)
					console.log()
					);
			})
		);
	}

	getPermiso(id: string): Observable<Permiso> {
		return this.httpClient.get<Permiso>(`${this.urlEndPoint}/${id}`).pipe(
			catchError(e => {
				this.router.navigate(['/administracion']);
				Swal.fire('Error al editar', e.error.mensaje, 'error');
				return throwError(() => new Error(e));
			})
		);
	}

	updatePermiso(permiso: Permiso): Observable<any> {
		return this.httpClient.put<any>(`${this.urlEndPoint}/${permiso.id}`, permiso, { headers: this.httpHeaders }).pipe(
			catchError(e => {
				if (e.status == 400) {
					return throwError(() => new Error(e));
				}
				Swal.fire('Error al editar Permiso', e.error.mensaje, 'error');
				return throwError(() => new Error(e));
			})
		);
	}

	deletePermiso(id: string): Observable<Permiso> {
		return this.httpClient.delete<Permiso>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
			catchError(e => {
				Swal.fire('Error al eliminar Permiso', e.error.mensaje, 'error');
				return throwError(() => new Error(e));
			})
		);
	}

}
