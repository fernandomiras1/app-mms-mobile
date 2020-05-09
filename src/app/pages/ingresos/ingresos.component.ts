import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { tipoEnum } from '../../shared/Enums';
import { ingresosType, Categoria, SubCategoria, CreateIngreso, CreateIngreso_Firebase } from '../../shared/model/ingresos.model';
import { MmsService } from '../../shared/services/mms-api.service';
import { FirebaseApiService } from '../../shared/services/firebase-api.service';
import { AuthService } from '../../auth/auth.service';
import { ListSelectComponent } from '../../components/list-select/list-select.component';

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
	showSpinnerModal = false;
	mode = 'indeterminate';
	value = 20;
	idEntidad: number;
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
		private router: Router) { }

	ngOnInit() {

		const uid = localStorage.getItem('uid');
		if (uid) {
			this.firebaseService.getEntidadById(uid).subscribe((id: number) => {
				this.mmsService.idEntidad = id;
				this.idEntidad = id;
				this.mmsService.getCategorias(tipoEnum.EGRESO).subscribe((resu: any) => {
					if (resu.ok) {
						console.log(resu);
						this.listCategorias = resu.result;
					}
				});
			})
		}

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
			this.showSpinnerModal = true;
			let newIngreso: CreateIngreso = {
				Id_Entidad: this.idEntidad,
				Id_Tipo: Number(this.formValue('toggleTipo').value),
				Id_Categoria: this.selectedCate.id,
				Id_SubCategoria: this.selectedSubCate.id,
				Id_Forma_Pago: 1,
				Fecha: new Date(this.formValue('date').value),
				Observación: String(this.formValue('detail').value).toUpperCase(),
				Precio: this.formValue('price').value
			}
			if (!navigator.onLine) {
				this.saveOffline(newIngreso);
				this.showSpinnerModal = false;
			} else {
				this.mmsService.createIngreso(newIngreso).pipe(
					catchError(error => {
						this.showSpinnerModal = false;
						this.saveDataFirebase();
						return throwError(new Error(error));
					})).subscribe((resu: any) => {
						this.showSpinnerModal = false;
					if (resu.ok) {
						this.clearForm();
						this.openSnackBar('El dato se guardo correctamente', 'Aceptar');
					}
				});
			}

 		}
	}

	saveOffline(newIngreso: CreateIngreso) {
		this.mmsService.createIngreso(newIngreso).subscribe(res => {
			console.log('res: Offile', res);
		});
		this.clearForm();
		this.openSnackBar('Los datos se guardaron en Modo Offline', 'Aceptar');
	}

	saveDataFirebase() {

		let newIngresoFirebase: CreateIngreso_Firebase = {
			Id_Entidad: this.idEntidad,
			Tipo: this.getTipo(Number(this.formValue('toggleTipo').value)),
			Id_Tipo: Number(this.formValue('toggleTipo').value),
			Categoria: this.selectedCate.Nombre,
			Id_Categoria: this.selectedCate.id,
			SubCategoria: this.selectedSubCate.Nombre,
			Id_SubCategoria: this.selectedSubCate.id,
			Id_Forma_Pago: 1,
			Fecha: this.formValue('date').value,
			Observacion: String(this.formValue('detail').value).toUpperCase(),
			Precio: this.formValue('price').value
		}
		console.log('firebase', newIngresoFirebase);
		this.firebaseService.addIngreso(newIngresoFirebase);
		this.router.navigate(['/home']);
	}

	clearForm() {
		this.form.reset();
		this.selectedCate = null;
		this.selectedSubCate = null;
		this.formValue('date').setValue(this.currentDate);
		this.formValue('toggleTipo').setValue(String(tipoEnum.EGRESO));
	}

	public logoutUser(): void {
		this.authService.logoutUser();
		this.router.navigate(['/login']);
	}


}
