import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PermisosComponent } from './permisos/permisos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './permisos/form.component';
import { FormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

//egisterLocaleData(localeES,'es');

const appRoutes: Routes = [
	{path: '', redirectTo: '', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'administracion', component: AdministracionComponent},
    {path: 'administracion/permisos', component: PermisosComponent},
    {path: 'administracion/permiso', component: FormComponent},
    {path: 'administracion/permiso/:id', component: FormComponent},
    {path: 'administracion/page/:page', component: PermisosComponent },
    {path: 'administracion/roles', component: RolesComponent },
    {path: '**', component: PageNotFoundComponent}
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
        UsuariosComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [{provide: LOCALE_ID, useValue: 'es-PY' }],
    bootstrap: [AppComponent]
})
export class AppModule { }
