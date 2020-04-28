import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { MmsService } from 'src/app/shared/services/mms-api.service';
import { ICate, ITipo, Categoria } from 'src/app/shared/model/ingresos.model';
import { tipoEnum } from 'src/app/shared/Enums';


@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {
	optionsTipo: ITipo[] = [
		{id: 1, name: 'INGRESO'},
		{id: 2, name: 'EGRESO'}
	];

	listCategorias: Categoria[] = [];
	listSubcate: ICate[] = [
		{name: 'Gastos', type: 'Yo'},
		{name: 'GYM', type: 'Yo'},
		{name: 'Ahorros', type: 'Yo'}
	]
	filteredOptions_Cate: Observable<Categoria[]>;
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
		private mmsService: MmsService,
		private authService: AuthService,
		private router: Router) { }

	ngOnInit() {
	    this.mmsService.getCategorias(tipoEnum.EGRESO).subscribe((data: Categoria[]) => {
			this.listCategorias = data;
			console.log('getCategorias', this.listCategorias);
		});

		this.form = this.fb.group({
			radioTipo: [String(tipoEnum.EGRESO)],
			comboCate: ['', Validators.required],
			comboSubcate: ['', Validators.required],
			userName: ['', Validators.required],
			password: ['', Validators.required]
		});

		// Categoria - Autocomeplete
		this.filteredOptions_Cate = this.form.get('comboCate').valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.Nombre),
			map(name => name ? this._filter(name) : this.listCategorias.slice())
		);

		// Sub Categoria - Autocomeplete
		this.filteredSubcate = this.form.get('comboSubcate').valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filterSubCate(name) : this.listSubcate.slice())
		);

		this.formValue('radioTipo').valueChanges.subscribe(idTipo => {
			this.formValue('comboCate').setValue('');
			this.mmsService.getCategorias(idTipo).subscribe((resu: Categoria[]) => {
				console.log(resu);
				this.listCategorias = resu;
				this.filteredOptions_Cate.subscribe(res => {
					console.log(res);
				});
			});
		})
	}

	closedTipo(event) {
		console.log(event);
	}

	formValue(value: string) {
		return this.form.get(value);
	}

	displayFn(cate: ICate): string {
		return cate && cate.name ? cate.name : '';
	}
	
	private _filter(name: string): Categoria[] {
	const filterValue = name.toLowerCase();
	return this.listCategorias.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
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
	return item ? item.Nombre : item;
	}

	public logoutUser(): void {
		this.authService.logoutUser();
		this.router.navigate(['/login']);
	}


}
