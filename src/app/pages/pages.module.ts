import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import {MaterialModule} from 'src/app/shared/material.module';
// formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRoutingModule } from './pages.routes';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ComponentsModule
  ],
  exports: [
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class PagesModule { }
