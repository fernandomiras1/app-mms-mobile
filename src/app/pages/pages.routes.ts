import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const pagesRoutes: Routes = [
    {
      path: 'home',
      data: {title: 'home'},
      canActivate: [AuthGuard],
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'ingresos',
      data: {title: 'Nuevo Ingresos'},
      canActivate: [AuthGuard],
      loadChildren: () => import('./ingresos/ingresos.module').then(m => m.IngresosModule)
    },
    {
      path: '**',
      redirectTo: '/ingresos',
      pathMatch: 'full'
    },
    {
      path: '',
      redirectTo: '/ingresos',
      pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }