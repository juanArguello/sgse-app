import { LoginComponent } from './usuarios/login/login.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PermisosComponent } from './permisos/permisos.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormComponent } from './permisos/form.component';
import { FormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VerPermisosComponent } from './roles/ver-permisos/ver-permisos.component';
import { FormRolComponent } from './roles/form-rol/form-rol.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule, Routes } from '@angular/router';
import { FormUsuarioComponent } from './usuarios/form-usuario/form-usuario.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AuthGuard } from './helpers/auth.guard';
import { RoleGuard } from './helpers/role.guard';

//egisterLocaleData(localeES,'es');

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: '', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
	{ path: 'administracion', component: AdministracionComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: 'administracion/permisos', component: PermisosComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: 'administracion/permiso', component: FormComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: 'administracion/permiso/:id', component: FormComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: 'administracion/page/:page', component: PermisosComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: 'administracion/roles', component: RolesComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: 'administracion/rol', component: FormRolComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: 'administracion/rol/:id', component: FormRolComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: 'administracion/page/:page', component: RolesComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: 'administracion/usuarios', component: UsuariosComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
    { path: 'administracion/usuario', component: FormUsuarioComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
    { path: 'administracion/usuario/:id', component: FormUsuarioComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
    { path: 'administracion/page/:page', component: UsuariosComponent , canActivate: [AuthGuard,RoleGuard],
        data:{role:'ADMINISTRADOR'}},
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        PermisosComponent,
        FormComponent,
        ClientesComponent,
        PageNotFoundComponent,
        PaginatorComponent,
        AdministracionComponent,
        HomeComponent,
        RolesComponent,
        UsuariosComponent,
        VerPermisosComponent,
        FormRolComponent,
        FormUsuarioComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgSelectModule,
        RouterModule.forRoot(routes),
        NgMultiSelectDropDownModule.forRoot()
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: LOCALE_ID, useValue: 'es-PY' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
