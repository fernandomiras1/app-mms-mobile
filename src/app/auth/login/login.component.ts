import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { AuthService } from '../auth.service';
import { debounceTime } from 'rxjs/operators';

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
  showSpinner = false;


  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    const email = localStorage.getItem('email');
    this.form = this.fb.group({
      userName: [email ? email : '', Validators.required],
      password: ['', Validators.required],
      rememberEmail: [email ? true : false]
    });

    this.form.get('password').valueChanges.pipe(debounceTime(800))
    .subscribe(data => {
      if (data.length >= 6) {
        this.onSubmit();
      }
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  rememberEmail() {
    if (this.form.get('rememberEmail').value) {
      localStorage.setItem('email', this.form.get('userName').value);
    } else {
      localStorage.removeItem('email');
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('es valido');
      this.rememberEmail();
      this.showSpinner = true;
      this.authService.loginEmailUser(this.form.get('userName').value, this.form.get('password').value)
      .then((res) => {
        this.snackBar.open('Logeado Correctamente', 'Aceptar', {
            duration: 3000
        });
        this.onLoginRedirect('home');
      }).catch(err => {
        console.log('err', err.message);
        this.showSpinner = false;
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

  getValue(value: string): string {
    return this.form.get(value).value;
  }

}
