import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home.routing';
import { ScrollingModule } from '@angular/cdk/scrolling';

// componentes
import { HomeComponent } from './home.component';

//  material

import { ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from '../pages.module';
import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        HttpClientModule,
        MaterialModule,
        ScrollingModule,
        PagesModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
