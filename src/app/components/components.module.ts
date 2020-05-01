import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ListSelectComponent } from './list-select/list-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../shared/directives/directives.module';
import { AlertViewComponent } from './alert-view/alert-view.component';
import { NumericKeypadComponent } from './numeric-keypad/numeric-keypad.component';
@NgModule({
  declarations: [
    ListSelectComponent,
    NumericKeypadComponent,
    AlertViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule
  ],
  exports: [
    ListSelectComponent,
    NumericKeypadComponent,
    AlertViewComponent
  ]
})
export class ComponentsModule { }
