import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  verBotones: boolean = false;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    })
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
        this.verBotones = true;
      })
  }

  cambiarDesde(valor: number) {
    let desdeVal = this.desde + valor;
    if (desdeVal < 0) {
      return;
    }
    if (desdeVal >= this.totalRegistros) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    this.cargando = true;
    if (termino.length <= 0) {
      this.desde = 0;
      this.cargarUsuarios();
    } else {
      this._usuarioService.buscarUsuarios(termino)
        .subscribe((resp: any) => {
          this.usuarios = resp.usuarios;
          this.totalRegistros = this.usuarios.length;
          this.cargando = false;
          this.verBotones = false;
        })
    }
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal(
      {
        title: '¿Está seguro?',
        text: 'Está a punto de borrar al Usuario ' + usuario.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }
    ).then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe(resp => {
            if (resp) {
              this.desde = 0;
              this.cargarUsuarios();
            }
          });
      }
    })
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizar(usuario)
      .subscribe();
  }

  abrirModalUpload(usuario: Usuario) {
    this._modalUploadService.mostarModal('usuarios', usuario._id);
  }
}
