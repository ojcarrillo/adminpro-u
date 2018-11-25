import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService) { }

  obtenerMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url);
  }

  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url);
  }

  buscarMedico(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url);
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .pipe(
        map((resp: any) => {
          swal('Médico Eliminado', 'El médico ha sido eliminado correctamente', 'success');
          return true;
        }))
  }

  crearMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico)
        .pipe(
          map((resp: any) => {
            swal('Médico Actualizado', medico.nombre, 'success');
            return resp.medico;
          })
        )
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
        .pipe(
          map((resp: any) => {
            swal('Médico Creado', medico.nombre, 'success');
            return resp.medico;
          })
        )
    }
  }

}
