import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HomeRoutingModule } from './home.routing';

// componentes
import { HomeComponent } from './home.component';

//material 
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AppMaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        // BrowserModule,
        HomeRoutingModule,
        HttpClientModule,        
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        AppMaterialModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
