import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home.routing';

// componentes
import { HomeComponent } from './home.component';

//  material
import { MaterialModule } from 'src/app/shared/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from '../pages.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        HttpClientModule,
        MaterialModule,
        PagesModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
