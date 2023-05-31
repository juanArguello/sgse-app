import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../usuarios/login/auth.service';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		
			let role = route.data['role'] as string;
			console.log(role);
			if(this.authService.hasRole(role)){
				return true;
			}
			Swal.fire({title: 'Acceso Denegado', text: 'No posee los permisos correspondientes',timer: 2000,icon: 'warning'});
			return false;
	}

}
