import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// import { MatProgressButtons } from 'mat-progress-buttons';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatListModule } from '@angular/material/list';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    // MatProgressButtons,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    // MatListModule,
    // MatProgressBarModule,
  ]
})
export class AppMaterialModule {}
