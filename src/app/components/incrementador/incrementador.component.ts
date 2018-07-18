import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  @Input('nombre') leyenda: String = 'Leyenda';
  @Input() progreso: number = 0;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number) {
    this.progreso += valor;
    if (this.progreso < 0) {
      this.progreso = 0;
    }
    if (this.progreso > 100) {
      this.progreso = 100;
    }
    this.txtProgreso.nativeElement.focus();
    this.cambioValor.emit(this.progreso);
  }

  onChange(newValue: number) {
    if (newValue > 100) {
      this.progreso = 100;
    } else if (newValue < 0 || newValue == null) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.txtProgreso.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }


}
