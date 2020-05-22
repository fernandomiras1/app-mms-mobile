import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  form: FormGroup;
  tokenUser: string;
  showSpinner = false;
  showPass = false;
  public version: string = environment.VERSION;
  public password: number[] = [];

  // Validators.pattern(this.regexEmail)
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    document.domain = "naranja.com";
    const email = localStorage.getItem('rememberEmail');
    this.form = this.fb.group({
      email: [email ? email : '', Validators.compose([
        Validators.required,
        Validators.pattern(this.regexEmail)
      ])],
      rememberEmail: [email ? true : false]
    });

    if (this.form.valid) {
      this.showPass = true;
    }
  }
  
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  getErrorMessage(formError?: any): string {

    let validatorName: string;
    const messages: any = {
      required: 'El campo es requerido',
      alphanumber: 'Ingresar sólo letras y/o números',
      number: 'Ingresar sólo números',
      email: 'El email es inválido',
      pattern: 'El email es inválido',
      phone: `Teléfono inválido`,
      dni: `El DNI ingresado es inválido`
    };

    if (formError) {
      messages.maxlength = (formError.maxlength) ? `No superar los ${formError.maxlength.requiredLength} caracteres` : '';
      messages.minlength = (formError.minlength) ? `Ingresar al menos ${formError.minlength.requiredLength} caracteres` : '';
    }

    for (const m in messages) {
      if (formError[m]) {
        validatorName = m;
        break;
      }
    }

    return messages[validatorName];
  }

  rememberEmail() {
    if (this.form.get('rememberEmail').value) {
      localStorage.setItem('rememberEmail', this.form.get('email').value);
    } else {
      localStorage.removeItem('rememberEmail');
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onNumberClick(value: any) {
    if (value.accion === 'add' && this.password.length <= 6) {
      if (this.password.length === 6) {
        return true;
      }
      this.password.push(value.number);
    } else {
      this.password.pop();
    }

    if (this.form.valid) {
      this.onSubmit();
    }
  }


  onSubmit() {
    if (this.form.valid) {
      this.showPass = true;
      const passwordNumber = String(this.password.join(''));

      if (passwordNumber.length >= 6) {
        this.rememberEmail();
        this.showSpinner = true;
        this.authService.loginEmailUser(this.form.get('email').value, passwordNumber)
        .then((resu: any) => {
          const { uid } = resu.user;
          localStorage.removeItem('uid');
          localStorage.setItem('uid', uid);
          this.onLoginRedirect('');
        }).catch(err => {
          console.log('err', err.message);
          this.showSpinner = false;
          this.snackBar.open('Error, Intentelo Nuevamente', 'Aceptar', {
            duration: 3000
          });
        });
      }
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

  get email() {
    return this.form.get('email');
  }

}
