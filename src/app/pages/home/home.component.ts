import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseApiService } from 'src/app/shared/services/firebase-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { CreateIngreso_Firebase, CreateIngreso } from 'src/app/shared/model/ingresos.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MmsService } from 'src/app/shared/services/mms-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ingresos: CreateIngreso_Firebase[] = [];
  synCount = 0;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewPort: CdkVirtualScrollViewport;
  constructor(private firebaseService: FirebaseApiService,
              public mmsService: MmsService) {}

  ngOnInit() {
    this.firebaseService.getAllIngresos().subscribe(ingreso => 
      {this.ingresos = ingreso
      console.log(this.ingresos);
      });
  }

  onSync() {
    this.ingresos.forEach((item: CreateIngreso_Firebase, index) => {
      this.synCount = index ++;
      let newIngreso: CreateIngreso = {
        Id_Entidad: 1,
        Id_Tipo: item.Id_Tipo,
        Id_Categoria: item.Id_Categoria,
        Id_SubCategoria: item.Id_SubCategoria,
        Id_Forma_Pago: 1,
        Fecha: new Date(item.Fecha),
        Observación:  item.Observacion,
        Precio:  item.Id_Tipo,
      }
      this.mmsService.createIngreso(newIngreso).subscribe(resu => {
        if (resu) {
          this.firebaseService.deleteBook(item.id);
        } else {
          return true;
        }
      })
    })
  }

  // getDateString(date: any) {
  //   console.log(date.toISOString().substring(0,10));
  //   return date.toISOString().substring(0,10).toString();
  // }


}
