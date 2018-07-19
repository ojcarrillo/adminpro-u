import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    
    this.contarTres().then(msg=>{
      console.log('acabo! ', msg);      
    })
  }

  ngOnInit() {
  }

  contarTres(): Promise<number>{
    return new Promise((resolve, reject) =>{
      let cont = 0;
      let intervalo = setInterval(()=>{
        cont++;
        if(cont==3){
          resolve(cont);
          clearInterval(intervalo);
        }
      }, 1000)
    });
  }
}
