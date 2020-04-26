import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

//material 
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AppMaterialModule } from 'src/app/shared/material.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRoutingModule } from './pages.routes';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatToolbarModule,
    // MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    AppMaterialModule
  ],
  declarations: [HomeComponent]
})
export class PagesModule { }
