import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;
  verBotones: boolean = false;
  desde: number = 0;

  constructor(public _medicoService: MedicoService, private _router: Router) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedicos(termino: string) {
    this.cargando = true;
    if (termino.length <= 0) {
      this.cargarMedicos();
    } else {
      this._medicoService.buscarMedico(termino)
        .subscribe((resp: any) => {
          this.medicos = resp.medicos;
          this.totalRegistros = this.medicos.length;
          this.cargando = false;
          this.verBotones = false;
        })
    }
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
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
    this.cargarMedicos();
  }

  borrarMedico(medico: Medico) {
    swal(
      {
        title: '¿Está seguro?',
        text: 'Está a punto de borrar al Médico ' + medico.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }
    ).then(borrar => {
      if (borrar) {
        this._medicoService.borrarMedico(medico._id)
          .subscribe(resp => {
            if (resp) {
              this.cargarMedicos();
            }
          });
      }
    })
  }

}
