import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseApiService } from 'src/app/shared/services/firebase-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { CreateIngreso_Firebase, CreateIngreso } from 'src/app/shared/model/ingresos.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MmsService } from 'src/app/shared/services/mms-api.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ingresos: CreateIngreso_Firebase[] = [];
  progress = 100;
  synCount = 0;
 observablesIngresos: Array<Observable<any>>;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewPort: CdkVirtualScrollViewport;
  constructor(private firebaseService: FirebaseApiService,
              public mmsService: MmsService) {}

  ngOnInit() {
    this.firebaseService.getAllIngresos().subscribe(ingreso => {
      this.ingresos = ingreso;
      this.synCount = this.ingresos.length;
    });
  }

  onSync() {
    let count: number = 0;
    this.ingresos.forEach((ingreso: CreateIngreso_Firebase) => {
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
