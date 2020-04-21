import { NgModule } from '@angular/core';
import { LoginComponent } from './login/Login.component';
import { AuthRoutingModule } from './auth.routing';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
    ],
    declarations: [LoginComponent]
})
export class AuthModule { }
