import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdministracionService {
    private urlEndPoint: string = 'http://localhost:8080/api/';
    

    constructor(private httpClient: HttpClient) { }

    getCantidadPermisos(): Observable<any> {
		return this.httpClient.get(this.urlEndPoint+'permisos/cantidad').pipe(
			map(response => response as number)
		);
	}

    getCantidadRoles(): Observable<any> {
		return this.httpClient.get(this.urlEndPoint+'roles/cantidad').pipe(
			map(response => response as number)
		);
	}

    getCantidadUsuarios(): Observable<any> {
		return this.httpClient.get(this.urlEndPoint+'usuarios/cantidad').pipe(
			map(response => response as number)
		);
	}

}
