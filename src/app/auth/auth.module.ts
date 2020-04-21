import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
    ],
    declarations: [
        LoginComponent
    ]
})
export class AuthModule { }
