import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('titulo') leyenda:String = '';
  @Input('labels') labels:string[] = [];
  @Input('data') data:number[] = [];
  @Input('tipo') type:string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
