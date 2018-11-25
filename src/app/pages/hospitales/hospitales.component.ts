import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;
  verBotones: boolean = false;

  constructor(public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarHospitales();
    })
  }

  buscarHospitales(termino: string) {
    this.cargando = true;
    if (termino.length <= 0) {
      this.cargarHospitales();
    } else {
      this._hospitalService.buscarHospital(termino)
        .subscribe((resp: any) => {
          this.hospitales = resp.hospitales;
          this.totalRegistros = this.hospitales.length;
          this.cargando = false;
          this.verBotones = false;
        })
    }
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHopsital()
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
        this.verBotones = true;
      })
  }

  borrarHospital(hospital: Hospital) {
    swal(
      {
        title: '¿Está seguro?',
        text: 'Está a punto de borrar al Hospital ' + hospital.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }
    ).then(borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id)
          .subscribe(resp => {
            if (resp) {
              this.cargarHospitales();
            }
          });
      }
    })
  }

  guardarHospital(hospital: Hospital) {
    console.log(hospital);

    this._hospitalService.actualizarHospital(hospital)
      .subscribe(resp => {
        console.log(resp);

      });
  }

  crearHospital() {
    swal({
      text: 'Por favor digite el nombre del Nuevo Hospital',
      icon: 'info',
      content: {
        element: "input",
        attributes: {
          placeholder: "Nombre del Hospital",
          type: "text"
        }
      },
      buttons: {
        cancel: {
          text: 'Cancelar',
          visible: true
        },
        confirm: {
          text: 'Guardar'
        }
      }
    }).then((value) => {
      if (value && value !== true && value !== '') {
        this._hospitalService.crearHospital(value)
          .subscribe(resp => {
            if (resp) {
              this.cargarHospitales();
            }
          });
      }
    });
  }

  abrirModalUpload(hospital: Hospital) {
    this._modalUploadService.mostarModal('hospitales', hospital._id);
  }

}
