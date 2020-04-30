import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from '../shared/directives/directives.module';
import { NumericKeypadComponent } from './numeric-keypad/numeric-keypad.component';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        DirectivesModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule
    ],
    declarations: [
        LoginComponent,
        NumericKeypadComponent
    ]
})
export class AuthModule { }
