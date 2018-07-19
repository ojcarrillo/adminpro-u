import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter, retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {
    this.suscription = this.regresaObservable()
      /*.pipe( 
        retry(2) 
      )*/.subscribe(numero => {
        console.log('contador: ', numero);
      },
      error => {
        console.log('error', error);
      },
      () => {
        console.log('final');
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let cont = 0;
      let intervalo = setInterval(() => {
        cont++;
        const salida = {
          valor: cont
        }
        observer.next(salida);
        if (cont == 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        // if(cont==4){
        //   clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }
      }, 1000)
    }).pipe(
      map(rta => {
        return rta.valor;
      }),
      filter((valor, index) => {
        console.log('ejecucion filter', valor, index);
        if (valor % 2 == 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
