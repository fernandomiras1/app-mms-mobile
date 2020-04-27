import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PagesComponent } from './pages.component';
// import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { IngresosComponent } from './ingresos/ingresos.component';


const pagesRoutes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     data: {title: 'Home'},
    //     canActivate: [AuthGuard],
    //     component: PagesComponent
    // },
    {
        path: 'home',
        component: HomeComponent,
        data: {title: 'home'},
        // canActivate: [AuthGuard],
        // loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'ingresos',
        component: IngresosComponent,
        data: {title: 'Nuevo Ingresos'},
        // canActivate: [AuthGuard],
        // loadChildren: () => import('./ingresos/ingresos.module').then(m => m.IngresosModule)
      },

    // { path: '', component: HomeComponent },
      { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }