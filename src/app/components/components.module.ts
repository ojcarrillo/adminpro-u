import { NgModule } from "@angular/core";
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ModalUploadComponent } from "./modal-upload/modal-upload.component";
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        IncrementadorComponent,
        GraficoDonaComponent,
        ModalUploadComponent
    ],
    exports: [
        IncrementadorComponent,
        GraficoDonaComponent,
        ModalUploadComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class ComponentsModule { }