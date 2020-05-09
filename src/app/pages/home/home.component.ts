import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { tap } from 'rxjs/operators';
import { CreateIngreso_Firebase, CreateIngreso } from '../../shared/model/ingresos.model';
import { FirebaseApiService } from '../../shared/services/firebase-api.service';
import { MmsService } from '../../shared/services/mms-api.service';
import { ActivatedRoute } from '@angular/router';
import { tipoEnum } from 'src/app/shared/Enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ingresos: CreateIngreso_Firebase[] = [];
  progress = 100;
  synCount = 0;
  public isOnline = false; 
  observablesIngresos: Array<Observable<any>>;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewPort: CdkVirtualScrollViewport;
  constructor(private firebaseService: FirebaseApiService,
              private routeActivate: ActivatedRoute,
              public mmsService: MmsService) {}

  ngOnInit() {
    const data: Observable<any> = this.routeActivate.snapshot.data.idEntidad;
		data.subscribe((id: number) => {
      this.mmsService.idEntidad = id;
      this.firebaseService.getAllIngresos(id).subscribe(ingreso => {
        this.ingresos = ingreso;
        if (this.synCount === 0) {
          this.synCount = this.ingresos.length;
        }
      });
		});
    
    this.serverOnline();
  }

  serverOnline(): void {
    this.mmsService.getCategorias(tipoEnum.EGRESO).subscribe((resu: any) => {
			this.isOnline = resu ? true : false;
    })
  }

  onSync() {
    let count: number = 0;
    this.ingresos.map((ingreso: CreateIngreso_Firebase) => {
      let newIngreso: CreateIngreso = {
        Id_Entidad: this.mmsService.idEntidad,
        Id_Tipo: ingreso.Id_Tipo,
        Id_Categoria: ingreso.Id_Categoria,
        Id_SubCategoria: ingreso.Id_SubCategoria,
        Id_Forma_Pago: 1,
        Fecha: new Date(ingreso.Fecha),
        Observación: ingreso.Observacion,
        Precio:  ingreso.Precio,
      }
 
      this.mmsService.createIngreso(newIngreso).pipe(
        tap(() => {
          count ++;
          this.progress = Math.trunc(this.updateProgress(this.synCount,count));
        })).subscribe((resu: any) => {
          if (resu) {
            this.firebaseService.deleteBook(ingreso.id);
            // this.firebaseService.updateBook(ingreso);
          } else {
            return true;
          }
      })
    })
  }

  updateProgress(init: number, count: number) {
    return ( init - ( count )) / init*100;
  }



}
