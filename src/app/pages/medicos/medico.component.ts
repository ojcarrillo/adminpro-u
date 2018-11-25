import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { NgForm } from '@angular/forms';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  hospital: Hospital = new Hospital('');

  constructor(public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      } else {
        this.medico = new Medico('', '', '', '', '');
        this.hospital = new Hospital('');
      }
    })
  }

  ngOnInit() {
    this._hospitalService.cargarHopsital()
      .subscribe((resp: any) => {
        this.hospitales = resp.hospitales;
      });
    this._modalUploadService.notificacion
      .subscribe(resp => {
        this.medico.img = resp.medico.img;
      })
  }

  cargarMedico(id: string) {
    this._medicoService.obtenerMedico(id)
      .subscribe((resp: any) => {
        this.medico = resp.medico;
        this.medico.hospital = resp.medico.hospital._id;
        this.cambiarHospital(this.medico.hospital);
      })
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._medicoService.crearMedico(this.medico)
      .subscribe(resp => {
        this.medico._id = resp._id;
        return this.router.navigate(['/medico', resp._id]);
      })
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      swal('Solo Imagenes', 'El formato de archino no es una imagen', 'error');
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarHospital(id: string) {
    this._hospitalService.obtenerHopsital(id)
      .subscribe((resp: any) => {
        this.hospital = resp.hospital;
      })
  }

  abrirModalUpload(medico: Medico) {
    this._modalUploadService.mostarModal('medicos', medico._id);
  }
}
