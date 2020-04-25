import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AppMaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DirectivesModule } from '../shared/directives/directives.module';
// import { DirectivesModule } from '../shared/directives/autofocus.directive';


@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        DirectivesModule
    ],
    declarations: [
        LoginComponent,
        // AutofocusDirective
    ]
})
export class AuthModule { }
