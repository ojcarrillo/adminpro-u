import { NgModule } from "@angular/core";
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations:[
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    exports:[
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    imports: [
        FormsModule,
        ChartsModule
    ]
})
export class ComponentsModule { }