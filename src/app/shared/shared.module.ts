import { NgModule } from "@angular/core";
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        NopagefoundComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        HeaderComponent
    ],
    exports: [
        NopagefoundComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        HeaderComponent
    ]
})
export class SharedModule { }