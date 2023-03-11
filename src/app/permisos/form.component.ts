import { PermisoService } from './permiso.service';
import { Permiso } from './permiso';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
	permiso: Permiso = new Permiso();
	titulo: string = 'Crear Permiso';

	constructor(private permisoService: PermisoService, private router: Router){}

	ngOnInit(): void {
		
	}

	public create(): void{
		this.permisoService.create(this.permiso).subscribe(
			response => this.router.navigate(['/administracion'])
		)
	}
}
