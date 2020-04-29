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
  regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 20;
  form: FormGroup;
  tokenUser: string;
  showSpinner = false;
  public password:number[] = [];


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

    // this.authService.authFirebase().subscribe((isAuth: boolean) => {
    //   if (isAuth) {
    //     this.onLoginRedirect('');
    //   }
    // });

    // this.form.get('password').valueChanges.pipe(debounceTime(800))
    // .subscribe(data => {
    //   if (data.length >= 6) {
    //     this.onSubmit();
    //   }
    // });
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

  onNumberClick(value: any) {
    console.log(value);
    if (value.accion === 'add') {
      this.password.push(value.number);
    } else {
      this.password.pop();
    }
    // if (this.password.find(value => value === value))
  }

  onSubmit() {

    const singleNumber = String(this.password.join(''));
    console.log(singleNumber); //12345

    if (this.form.valid) {
      this.rememberEmail();
      this.showSpinner = true;
      this.authService.loginEmailUser(this.form.get('userName').value, this.form.get('password').value)
      .then((res) => {
        console.log('resu login', res);
        this.snackBar.open('Logeado Correctamente', 'Aceptar', {
            duration: 3000
        });
        this.onLoginRedirect('');
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
