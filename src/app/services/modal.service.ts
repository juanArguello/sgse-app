import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
 
    mostrar: boolean = false;
    
    constructor() { }

    abrirModal() {
        this.mostrar = true;
    }

    cerrarModal() {
        this.mostrar = false;
    }
}
