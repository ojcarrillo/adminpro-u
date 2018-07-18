import { Injectable, Inject } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjuests();
   }

  guardarAjuests(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjuests(){
    if(localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }
    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(temaSel: String){
    let url = `assets/css/colors/${temaSel}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    
    this.ajustes.tema = temaSel;
    this.ajustes.temaUrl = url;
    this.guardarAjuests();
  }
}

interface Ajustes {
  temaUrl: String;
  tema: String;
}