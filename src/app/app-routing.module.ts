import { PermisosComponent } from './permisos/permisos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './permisos/form.component';

const routes: Routes = [
	{path: '', redirectTo: 'administracion', pathMatch: 'full'},
    {path: 'administracion', component: PermisosComponent},
    {path: 'administracion/permiso', component: FormComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
