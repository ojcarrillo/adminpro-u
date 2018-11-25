import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService) {

  }

  obtenerHopsital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url);
  }

  cargarHopsital() {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .pipe(
        map((resp: any) => {
          swal('Hospital Eliminado', 'El hospital ha sido eliminado correctamente', 'success');
          return true;
        }))
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, { 'nombre': nombre })
      .pipe(
        map((resp: any) => {
          swal('Hospital Creado', nombre, 'success');
          return resp.hospital;
        })
      )
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url);
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + `/hospital/${hospital._id}`;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital)
      .pipe(
        map((resp: any) => {
          swal('Hospital Actualiado', resp.hospital.nombre, 'success');
          return true;
        }))
  }
}
