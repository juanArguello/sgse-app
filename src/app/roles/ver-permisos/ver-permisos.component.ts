import { ModalService } from '../../services/modal.service';
import { Permiso } from './../../permisos/permiso';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Rol } from '../rol';

@Component({
	selector: 'app-ver-permisos',
	templateUrl: './ver-permisos.component.html',
	styleUrls: ['./ver-permisos.component.css']
})
export class VerPermisosComponent implements OnInit, OnChanges{
	@Input() rol!: Rol;
	permisos: Permiso[] = [];
	modalService!: ModalService
	tituloModal = 'Lista de permisos del Rol ';

	constructor(modalService: ModalService){
		this.modalService = modalService;
	}
	
	ngOnInit(): void {
		this.initPoblar();
	}

	ngOnChanges(changes: SimpleChanges): void {
		let rolActualizado = changes['rol'];
		if (rolActualizado.previousValue) {
			this.initPoblar();
		}
	}

	initPoblar(){
		this.permisos = this.rol.permisosList;
	}

	closeModal(){
		this.modalService.cerrarModal();
	}
}
