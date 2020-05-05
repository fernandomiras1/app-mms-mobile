import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseApiService } from 'src/app/shared/services/firebase-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { CreateIngreso_Firebase } from 'src/app/shared/model/ingresos.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MmsService } from 'src/app/shared/services/mms-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ingresos: Observable<CreateIngreso_Firebase[]>;
  
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewPort: CdkVirtualScrollViewport;
  constructor(private firebaseService: FirebaseApiService,
              public mmsService: MmsService) {}

  ngOnInit() {
    this.ingresos = this.firebaseService.getAllIngresos();
  }

  onSync() {
    this.ingresos.forEach(ingreso => {
      console.log(ingreso);
    })

  }

  // getDateString(date: any) {
  //   console.log(date.toISOString().substring(0,10));
  //   return date.toISOString().substring(0,10).toString();
  // }


}
