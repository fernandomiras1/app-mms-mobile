import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { MmsService } from 'src/app/shared/services/mms-api.service';
import { ICate, ITipo, Categoria } from 'src/app/shared/model/ingresos.model';
import { tipoEnum } from 'src/app/shared/Enums';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ListSelectComponent } from 'src/app/components/list-select/list-select.component';

export interface DialogData {
	options: Categoria[];
}
@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

	animal: string;
  	name: string;

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
	form: FormGroup;
	tokenUser: string;
	constructor(private fb: FormBuilder,
		private mmsService: MmsService,
		private authService: AuthService,
		public dialog: MatDialog,
		private router: Router) { }

	ngOnInit() {
		this.mmsService.getCategorias(tipoEnum.EGRESO).subscribe((resu: any) => {
			if (resu.ok) {
				console.log(resu);
				this.listCategorias = resu.result;
			}
		});

		this.form = this.fb.group({
			toggleTipo: [String(tipoEnum.EGRESO)],
			userName: [''],
			detail: ['']
		});

		// Categoria - Autocomeplete
		// this.filteredOptions_Cate = this.form.get('comboCate').valueChanges.pipe(
		// 	startWith(''),
		// 	map(value => typeof value === 'string' ? value : value.Nombre),
		// 	map(name => name ? this._filter(name) : this.listCategorias.slice())
		// );

		// Sub Categoria - Autocomeplete
		// this.filteredSubcate = this.form.get('comboSubcate').valueChanges.pipe(
		// 	startWith(''),
		// 	map(value => typeof value === 'string' ? value : value.name),
		// 	map(name => name ? this._filterSubCate(name) : this.listSubcate.slice())
		// );
		
	}

	closedTipo(event) {
		console.log(event);
	}

	formValue(value: string) {
		return this.form.get(value);
	}

	openedAutoCompleteCate(event) {
		// this.mmsService.getCategorias(this.formValue('radioTipo').value).subscribe((resu: any) => {
		// 	if (resu.ok) {
		// 		this.listCategorias = resu.result;
		// 		this.cdRef.detectChanges();
		// 	}
		// });
	}

	onClickedToggle(event: MatButtonToggleChange) {
		this.mmsService.getCategorias(Number(event.value)).subscribe((resu: any) => {
			if (resu.ok) {
				this.listCategorias = resu.result;
			}
		});
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(ListSelectComponent, {
		  width: '90%',
		  data: {options: this.listCategorias}
		});
	
		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		  console.log(result);
		});
	}

	

	// displayFn(cate: ICate): string {
	// 	return cate && cate.name ? cate.name : '';
	// }

	// private _filter(name: string): Categoria[] {
	// const filterValue = name.toLowerCase();
	// return this.listCategorias.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
	// }

	// private _filterSubCate(name: string): ICate[] {
	// const filterValue = name.toLowerCase();
	// return this.listSubcate.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
	// }


	// searchArticles(source){
	// 	console.log("selected source is: "+source);
	// 	this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
	// }

	// isFieldInvalid(field: string) {
	// 	return (
	// 		(!this.form.get(field).valid && this.form.get(field).touched) ||
	// 		(this.form.get(field).untouched && this.formSubmitAttempt)
	// 	);
	// }

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
	}

	// displayComboCate(item): string {
	// return item ? item.Nombre : item;
	// }

	public logoutUser(): void {
		this.authService.logoutUser();
		this.router.navigate(['/login']);
	}


}
