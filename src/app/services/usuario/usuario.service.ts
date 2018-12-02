import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient,
    public router: Router,
    public _subirArchivo: SubirArchivoService) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 6 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          swal('Usuario Creado', usuario.email, 'success');
          return resp.usuario;
        }),
        catchError(err => {
          swal(err.error.msg, err.error.errors.message, 'error');
          return throwError(err);
        })
      )
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        }),
        catchError(err => {
          swal('Error en el login', err.error.errors.message, 'error');
          return throwError(err);
        })
      )
  }

  logout() {
    this.token = null;
    this.usuario = null;
    this.menu = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  actualizar(usuario: Usuario) {
    let url = URL_SERVICIOS + `/usuario/${usuario._id}`;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .pipe(
        map((resp: any) => {
          if (usuario._id === this.usuario._id) {
            this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
          }
          swal('Usuario Actualiado', resp.usuario.nombre, 'success');
          return true;
        }),
        catchError(err => {
          swal(err.error.msg, err.error.errors.message, 'error');
          return throwError(err);
        })
      )
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivo.fileUpload(archivo, 'usuarios', id)
      .subscribe((resp: any) => {
        console.log(resp.usuario);
        this.usuario.img = resp.usuario.img;
        swal('Fotografía Actualizada correctamente', '', 'success');
        this.guardarStorage(id, this.token, resp.usuario, this.menu);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url);
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .pipe(
        map((resp: any) => {
          swal('Usuario Eliminado', 'El usuario ha sido eliminado correctamente', 'success');
          return true;
        }))
  }
}
