import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/shared/services/news-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
// import { ButtonOpts } from 'mat-progress-buttons';
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface ICate {
	name: string;
	type: string;
  }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	optionsTipo: string[] = ['INGRESO', 'EGRESO'];
	listCategorias: ICate[] = [
		{name: 'Alimentacion', type: 'Egreso'},
		{name: 'Auto', type: 'Egreso'},
		{name: 'Yo', type: 'Egreso'}
	]
	filteredOptions: Observable<ICate[]>;
  	mArticles:Array<any>;
	mSources:Array<any>;
	color: ThemePalette = 'primary';
	mode: ProgressSpinnerMode = 'indeterminate';
	value = 20;
	form: FormGroup;
	tokenUser: string;
	private formSubmitAttempt: boolean;
	
	constructor(private fb: FormBuilder){
		console.log('app component constructor called');         
	}

	ngOnInit() {
        //load articles
	    // this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
		//load news sources
		// this.newsapi.initSources().subscribe(data=> this.mSources = data['sources']);	
		this.form = this.fb.group({
			comboTipo: ['EGRESO', Validators.required],
			comboCate: ['', Validators.required],
			userName: ['', Validators.required],
			password: ['', Validators.required]
		});

		// Recurso - Autocomeplete
		this.filteredOptions = this.form.get('comboCate').valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filter(name) : this.listCategorias.slice())
		);
	}

	displayFn(cate: ICate): string {
		return cate && cate.name ? cate.name : '';
	  }
	
	  private _filter(name: string): ICate[] {
		const filterValue = name.toLowerCase();
	
		return this.listCategorias.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
	  }


	// searchArticles(source){
	// 	console.log("selected source is: "+source);
	// 	this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
	// }

	isFieldInvalid(field: string) {
		return (
			(!this.form.get(field).valid && this.form.get(field).touched) ||
			(this.form.get(field).untouched && this.formSubmitAttempt)
		);
	}
	
	  onSubmit() {
		if (this.form.valid) {
		  console.log('es valido');
		  // this.spinnerButtonOptions.active = true;
		  // this.spinnerButtonOptions.text = 'Cargando datos...';
		  // this.authService.login(this.form.value).subscribe(data => {
		  //   this.snackBar.open('Logeado Correctamente', 'Aceptar', {
		  //     duration: 3000
		  //   });
		  // }, error => {
		  //   this.spinnerButtonOptions.active = false;
		  //   this.spinnerButtonOptions.text = 'Login';
		  //   this.snackBar.open('El usuario y/o contraseña son incorrectas', 'Reintentar', {
		  //     duration: 3000
		  //   });
		  // }, () => {
		  //   this.route.navigate(['/home']);
		  // });
		}
		this.formSubmitAttempt = true;
	  }

	  displayComboCate(item): string {
		return item ? item.name : item;
	  }


}
