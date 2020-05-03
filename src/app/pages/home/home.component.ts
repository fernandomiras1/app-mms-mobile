import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from 'src/app/shared/services/firebase-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { CreateIngreso_Firebase } from 'src/app/shared/model/ingresos.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ingresos: Observable<CreateIngreso_Firebase[]>;
  constructor(private firebaseService: FirebaseApiService) {}

  ngOnInit() {
    this.ingresos = this.firebaseService.getAllIngresos();
  }

  // getDateString(date: any) {
  //   console.log(date.toISOString().substring(0,10));
  //   return date.toISOString().substring(0,10).toString();
  // }


}
