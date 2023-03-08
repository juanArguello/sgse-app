import { Permiso } from './permiso';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class PermisoService {

	private urlEndPoint: string = 'http://localhost:8080/apirest/permisos';

	constructor(private http: HttpClient) { }

	getPermisos(): Observable<Permiso[]> {
		return this.http.get(this.urlEndPoint).pipe(
			map(response => response as Permiso[])
		);
	}
}
