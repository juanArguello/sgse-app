import { Cliente } from './../clientes/cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../clientes/cliente.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	tituloCliente: string = 'Seccion Clientes';
	clientes: Cliente[] = [];

	constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) {

	}

	ngOnInit(): void {
		this.clienteService.getClientes().subscribe(
			response => this.clientes = response);
	}

}
