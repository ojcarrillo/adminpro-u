import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from 'src/app/pages/pages.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ProgressComponent } from 'src/app/pages/progress/progress.component';
import { Graficas1Component } from 'src/app/pages/graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';


const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Componente progressbar' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas de donas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'observables', component: RxjsComponent, data: { titulo: 'Observables' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Temas' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            // mantenimiento
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);