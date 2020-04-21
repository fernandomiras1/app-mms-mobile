import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AppMaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class AuthModule { }
