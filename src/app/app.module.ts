import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PermisosComponent } from './permisos/permisos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './permisos/form.component';
import { FormsModule } from '@angular/forms';



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
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
