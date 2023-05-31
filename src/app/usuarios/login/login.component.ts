import { Credencial } from './credencial';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

	tituloLogin: string = 'Inicie Sesion';
	credencial: Credencial = {
		username: '',
		password: ''
	};

	constructor(private authService: AuthService, private router: Router){}

	ngOnInit(): void {
		if(this.authService.isAuthenticated()){
			this.router.navigate(['/']);
			return;
		}
	}

	login(form: NgForm): void{
		this.authService.login(this.credencial)
			.subscribe({
				next:response=>{
					this.router.navigate(['/']);
				},error: err=>{
					if(err.status == 401 || err.status == 403){
						Swal.fire('Error Login','Usuario o contraseña incorrecta','error');
					}
				}
			}	 
		);
	}

	mostrarPassword() {
		let mipass = document.getElementById('password');
		let ojo = document.getElementById("icono");
		
		if (mipass?.getAttribute("type") === "password") {
			mipass?.setAttribute("type","text");
			ojo?.setAttribute("class", "bi bi-eye-slash-fill");
		} else {
			mipass?.setAttribute("type","password");
			ojo?.setAttribute("class", "bi bi-eye-fill");
		}
	}

}
