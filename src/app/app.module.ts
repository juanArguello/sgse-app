import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PermisosComponent } from './permisos/permisos.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './permisos/form.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {path: '', redirectTo: '/administracion', pathMatch: 'full'},
    {path: 'administracion', component: PermisosComponent},
    {path: 'administracion/permiso', component: FormComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        PermisosComponent,
        FormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
