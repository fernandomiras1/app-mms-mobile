import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IngresosRoutingModule } from './ingresos.routing';

// componentes
import { IngresosComponent } from './ingresos.component';

//  material
import { MaterialModule } from 'src/app/shared/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from '../pages.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IngresosRoutingModule,
        HttpClientModule,
        MaterialModule,
        PagesModule
    ],
    declarations: [IngresosComponent]
})
export class IngresosModule { }
