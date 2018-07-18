import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _settings: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarTema(temaSel: String, link: any) {
    this.aplicarCheck(link);
    this._settings.aplicarTema(temaSel);
  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName('selector');
    for (let sel of selectores) {
      sel.classList.remove('working');
    }
    link.classList.add('working')
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._settings.ajustes.tema;
    for (let sel of selectores) {
      if(sel.getAttribute('data-theme')===tema){
        sel.classList.add('working');
        break;
      }
    }
  }
}
