import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../usuarios/login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	home: string = 'Home';
	login: string = 'Login';

	constructor(protected authService: AuthService, private router: Router){}
	
	logout(): void{
		this.authService.logout();
		this.router.navigate(['/login']);
	}

}
