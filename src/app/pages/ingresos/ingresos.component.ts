import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { MmsService } from 'src/app/shared/services/mms-api.service';
import { Categoria, SubCategoria, ingresosType } from 'src/app/shared/model/ingresos.model';
import { tipoEnum } from 'src/app/shared/Enums';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { ListSelectComponent } from 'src/app/components/list-select/list-select.component';

export interface DialogData {
	options: any[];
	type: string;
}

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

	showSpinner = false;
	mode = 'indeterminate';
	value = 20;

	statusType: typeof tipoEnum = tipoEnum;
	type = ingresosType;
	listCategorias: Categoria[] = [];
	listSubcate: SubCategoria[] = [];
	selectedCate: Categoria;
	selectedSubCate: SubCategoria;

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


	getAllSub_categoria(idCate) {
		this.mmsService.get_Sub_categorias(idCate).subscribe((resu: any) => {
			this.listSubcate = resu.result;
			this.showSpinner = false;
		})
	}

	openDialog(list, type: string): void {
		this.showSpinner = true;
		const dialogRef = this.dialog.open(ListSelectComponent, {
		  width: '90%',
		  data: {type, options: list}
		});
	
		dialogRef.afterClosed().subscribe((result: {selectedItem: any, type: string}) => {
		  if (result) {
			if (type === ingresosType.CATE) {
				this.selectedCate = result.selectedItem;
				this.getAllSub_categoria(result.selectedItem.id);
			} else {
				this.selectedSubCate = result.selectedItem;
				this.showSpinner = false;
			}
		  }
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
