import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit , OnChanges {

	@Input() paginador: any;
	paginas?: number[] = [];
	desde?: number;
	hasta?: number;

	ngOnInit(): void {
		this.initPaginator();
		/* this.paginas = new Array(this.paginador.ultimoNumeroPagina).fill(0).
		map((valor, indice) => indice + 1

		) */
	}

	ngOnChanges(changes: SimpleChanges) {
		let paginadorActualizado = changes['paginador'];

		if (paginadorActualizado.previousValue) {
			this.initPaginator();
		}

	}

	private initPaginator(): void {
		this.desde = Math.min(Math.max(1, this.paginador.actualNumeroPagina - 4), this.paginador.ultimoNumeroPagina - 5);
		this.hasta = Math.max(Math.min(this.paginador.ultimoNumeroPagina, this.paginador.actualNumeroPagina + 4), 6);

		if (this.paginador.ultimoNumeroPagina > 5) {
			this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde!);
		} else {
			this.paginas = new Array(this.paginador.ultimoNumeroPagina).fill(0).map((_valor, indice) => indice + 1);
		}
	}


}
