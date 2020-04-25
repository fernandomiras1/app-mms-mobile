import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService, ButtonService } from 'src/app/services/service.index';
import {MatSnackBar} from '@angular/material/snack-bar';
// import { ButtonOpts } from 'mat-progress-buttons';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 20;
  form: FormGroup;
  tokenUser: string;
  private formSubmitAttempt: boolean;
  // spinnerButtonOptions: ButtonOpts;
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.spinnerButtonOptions = this.buttonService.spinnerButton('Login', 22, 'primary', 'primary');
    // this.authService.logoutUser();
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('es valido');
      this.authService.loginEmailUser(this.form.get('userName').value, this.form.get('password').value)
      .then((res) => {
        this.snackBar.open('Logeado Correctamente', 'Aceptar', {
            duration: 3000
        });
        this.onLoginRedirect('home');
      }).catch(err => {
        console.log('err', err.message);
        this.snackBar.open('Error, Intentelo Nuevamente', 'Aceptar', {
          duration: 3000
        });

      });
    }
    this.formSubmitAttempt = true;
  }

  onLogout() {
    this.onLoginRedirect('login');
    this.authService.logoutUser();
  }

  onLoginRedirect(path: string): void {
    this.router.navigate([path]);
  }

}
