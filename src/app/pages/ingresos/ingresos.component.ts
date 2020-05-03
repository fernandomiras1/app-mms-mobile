import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MmsService } from 'src/app/shared/services/mms-api.service';
import { Categoria, SubCategoria, ingresosType, CreateIngreso, CreateIngreso_Firebase } from 'src/app/shared/model/ingresos.model';
import { tipoEnum } from 'src/app/shared/Enums';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { ListSelectComponent } from 'src/app/components/list-select/list-select.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseApiService } from 'src/app/shared/services/firebase-api.service';

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
		private firebaseService: FirebaseApiService,
		private authService: AuthService,
		public snackBar: MatSnackBar,
		public dialog: MatDialog,
		public activatedRoute:ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.activatedRoute.data.subscribe(data => {
			const { idEntidad } = data;
			this.mmsService.idEntidad = idEntidad;
			this.mmsService.getCategorias(tipoEnum.EGRESO).subscribe((resu: any) => {
				if (resu.ok) {
					console.log(resu);
					this.listCategorias = resu.result;
				}
			});
		});

		this.form = this.fb.group({
			toggleTipo: [String(tipoEnum.EGRESO)],
			price: [null, Validators.required],
			date: [this.currentDate, Validators.required],
			detail: ['']
		});
		
	}

	get currentDate() {
		const currentDate = new Date();
		return currentDate.toISOString().substring(0,10);
	}

	formValue(value: string) {
		return this.form.get(value);
	}

	onClickedToggle(event: MatButtonToggleChange) {
		this.mmsService.getCategorias(Number(event.value)).subscribe((resu: any) => {
			if (resu.ok) {
				this.selectedCate = null;
				this.selectedSubCate = null;
				this.listCategorias = resu.result;
			}
		});
	}


	getAllSub_categoria(idCate) {
		this.mmsService.get_Sub_categorias(idCate).subscribe((resu: any) => {
			this.listSubcate = resu.result;
			this.selectedSubCate = null;
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
		  } else {
			this.showSpinner = false;
		  }
		});
	}

	public numberOnly(event: KeyboardEvent): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57) && event.key !== '.') {
			return false;
		}
		return true;
	}

	get isFormValid(): boolean {
		return !this.selectedCate || !this.selectedSubCate || !this.form.valid ? true : false;
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
		  duration: 3000
		});
	}

	getTipo(value: number) {
		return value === tipoEnum.INRESO ? 'INGRESO' : 'EGRESO';
	}

	onSubmit() {
		if (!this.isFormValid) {
			console.log('es valido');

			// if ( navigator.onLine) {
			// 	console.log('online');
			// } else {
			// 	console.log('ofline');
			// }

			let newIngreso: CreateIngreso = {
				Id_Entidad: 1,
				Id_Tipo: Number(this.formValue('toggleTipo').value),
				Id_Categoria: this.selectedCate.id,
				Id_SubCategoria: this.selectedSubCate.id,
				Id_Forma_Pago: 1,
				Fecha: new Date(this.formValue('date').value),
				Observación: this.formValue('detail').value,
				Precio: this.formValue('price').value

			}
			let newIngresoFirebase: CreateIngreso_Firebase = {
				Id_Entidad: 1,
				Tipo: this.getTipo(Number(this.formValue('toggleTipo').value)),
				Id_Tipo: Number(this.formValue('toggleTipo').value),
				Categoria: this.selectedCate.Nombre,
				Id_Categoria: this.selectedCate.id,
				SubCategoria: this.selectedSubCate.Nombre,
				Id_SubCategoria: this.selectedSubCate.id,
				Id_Forma_Pago: 1,
				Fecha: this.formValue('date').value,
				Observacion: this.formValue('detail').value,
				Precio: this.formValue('price').value
			}
			// this.mmsService.createIngreso(newIngreso).subscribe((resu: any) => {
			// 	console.log(resu);
			// 	if (resu.ok) {
			// 		this.openSnackBar('El dato se guardo correctamente', 'Aceptar');
			// 	} else {
			// 		this.openSnackBar('Error en guardar el dato', 'Aceptar');
			// 	}
			// });
			this.firebaseService.addIngreso(newIngresoFirebase).then(resu => {
				if(resu) {
					this.router.navigate(['/home']);
				}
			});
			
			// this.spinnerButtonOptions.active = true;
			// this.spinnerButtonOptions.text = 'Cargando datos...';
			// this.authService.login(this.form.value).subscribe(data => {
			//   this.snackBar.open('Logeado Correctamente', 'Aceptar', {
			//     duration: 3000
			//   });
			// }, error => {
			//   this.spinnerButtonOptions.active = false;
			//   this.spinnerButtonOptions.text = 'Login';
			// }, () => {
			//   this.route.navigate(['/home']);
			// });
			}
	}

	public logoutUser(): void {
		this.authService.logoutUser();
		this.router.navigate(['/login']);
	}


}
