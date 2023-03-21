import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-administracion',
    templateUrl: './administracion.component.html',
    styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
    
    tituloCabecera: string = 'Panel Administrativo';
    
    ngOnInit(): void {
        
    }
}
