import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/shared/services/news-api.service';
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

export interface ICate {
	name: string;
	type: string;
}
@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {
	optionsTipo: string[] = ['INGRESO', 'EGRESO'];
	listCategorias: ICate[] = [
		{name: 'Alimentacion', type: 'Egreso'},
		{name: 'Auto', type: 'Egreso'},
		{name: 'Yo', type: 'Egreso'}
	]
	listSubcate: ICate[] = [
		{name: 'Gastos', type: 'Yo'},
		{name: 'GYM', type: 'Yo'},
		{name: 'Ahorros', type: 'Yo'}
	]
	filteredOptions: Observable<ICate[]>;
	filteredSubcate: Observable<ICate[]>;
  	mArticles:Array<any>;
	mSources:Array<any>;
	color: ThemePalette = 'primary';
	mode: ProgressSpinnerMode = 'indeterminate';
	value = 20;
	form: FormGroup;
	tokenUser: string;
	private formSubmitAttempt: boolean;
	
	constructor(private fb: FormBuilder,
		private newsapi:NewsApiService,
		private authService: AuthService,
		private router: Router) {
			console.log('app component constructor called');
	}

	ngOnInit() {
		//load articles
		console.log('Home Component');
	    this.newsapi.getArticlesByID('techcrunch').subscribe(data => {
			console.log(data);
			// this.mArticles = data['articles'];
		});
		//load news sources
		// this.newsapi.initSources().subscribe(data=> this.mSources = data['sources']);	
		this.form = this.fb.group({
			comboTipo: ['EGRESO', Validators.required],
			comboCate: ['', Validators.required],
			comboSubcate: ['', Validators.required],
			userName: ['', Validators.required],
			password: ['', Validators.required]
		});

		// Categoria - Autocomeplete
		this.filteredOptions = this.form.get('comboCate').valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filter(name) : this.listCategorias.slice())
		);

		// Sub Categoria - Autocomeplete
		this.filteredSubcate = this.form.get('comboSubcate').valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterSubCate(name) : this.listSubcate.slice())
		);
	}

	displayFn(cate: ICate): string {
		return cate && cate.name ? cate.name : '';
	  }
	
	private _filter(name: string): ICate[] {
	const filterValue = name.toLowerCase();
	return this.listCategorias.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
	}

	private _filterSubCate(name: string): ICate[] {
	const filterValue = name.toLowerCase();
	return this.listSubcate.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
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

	public logoutUser(): void {
		this.authService.logoutUser();
		this.router.navigate(['/login']);
	}


}
