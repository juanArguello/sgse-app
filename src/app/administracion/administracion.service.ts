import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdministracionService {
    private urlEndPoint: string = 'http://localhost:8080/api/';
    
    cantidades: number[] = [];

    constructor(private httpClient: HttpClient) { }

    getPermisos(): Observable<any> {
		return this.httpClient.get(this.urlEndPoint).pipe(
			map(response => response as number)
		);
	}

}
