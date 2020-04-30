import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../shared/material.module';
import { ListSelectComponent } from './list-select/list-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../shared/directives/directives.module';
@NgModule({
  declarations: [
    HeaderComponent,
    ListSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    ListSelectComponent
  ]
})
export class ComponentsModule { }
