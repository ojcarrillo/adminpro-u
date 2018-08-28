import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  constructor(private _usuarioService: UsuarioService,
    public router: Router) { }

  ngOnInit() {
    init_plugins();
    let email = localStorage.getItem('email') || '';
    if(email.length>0){
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, this.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']))

  }
}
