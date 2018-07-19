import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  tituloPagina='';

  constructor(private router: Router,
              private title: Title,
              private meta: Meta) {
    this.getDataRouter().subscribe( data => {
      this.tituloPagina = data.titulo;
      this.title.setTitle( data.titulo );
      const tag: MetaDefinition = {
        name: 'description',
        content: data.titulo
      };
      meta.updateTag(tag);
    })
   }

  ngOnInit() {
  }

  getDataRouter(){
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }

}
