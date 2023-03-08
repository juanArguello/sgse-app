import { Permiso } from './permiso';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
	permiso: Permiso = new Permiso();
	titulo: string = 'Crear Permiso';

	constructor(){}
	ngOnInit(): void {
		
	}

	public create(): void{
		console.log("clicked");
		console.log(this.permiso);
	}
}
