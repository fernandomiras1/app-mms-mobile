import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { MmsService } from 'src/app/shared/services/mms-api.service';
import { ICate, Categoria } from 'src/app/shared/model/ingresos.model';
import { tipoEnum } from 'src/app/shared/Enums';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
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

	statusType: typeof tipoEnum = tipoEnum;
	listCategorias: Categoria[] = [];
	selectedCate: Categoria;
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
			price: [0],
			detail: ['']
		});
		
	}

	closedTipo(event) {
		console.log(event);
	}

	formValue(value: string) {
		return this.form.get(value);
	}

	onClickedToggle(event: MatButtonToggleChange) {
		this.mmsService.getCategorias(Number(event.value)).subscribe((resu: any) => {
			if (resu.ok) {
				this.selectedCate = null;
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
		  if (result) {
			this.selectedCate = result;
		  }
		  console.log(result);
		});
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
	}

	// displayComboCate(item): string {
	// return item ? item.Nombre : item;
	// }

	public logoutUser(): void {
		this.authService.logoutUser();
		this.router.navigate(['/login']);
	}


}
