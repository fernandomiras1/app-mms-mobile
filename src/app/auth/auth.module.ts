import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from '../shared/directives/directives.module';
import { NumericKeypadComponent } from './numeric-keypad/numeric-keypad.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        DirectivesModule
    ],
    declarations: [
        LoginComponent,
        NumericKeypadComponent
    ]
})
export class AuthModule { }
