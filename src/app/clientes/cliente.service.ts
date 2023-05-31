import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
	private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private httpClient: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
		return this.httpClient.get(this.urlEndPoint).pipe(
			map(response => response as Cliente[])
		);
	}
}
