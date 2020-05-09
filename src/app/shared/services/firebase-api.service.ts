import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CreateIngreso_Firebase } from '../model/ingresos.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { MmsService } from './mms-api.service';
export interface EntidadI {
  idEntidad: number;
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseApiService {

  private ingresosCollection: AngularFirestoreCollection<CreateIngreso_Firebase>;
  private ingresos: Observable<CreateIngreso_Firebase[]>;
  private entidadDoc: AngularFirestoreDocument<EntidadI>;
  private ingresodDoc: AngularFirestoreDocument<CreateIngreso_Firebase>;
  constructor(private afs: AngularFirestore, 
              private mmsService: MmsService) { }

  getAllIngresos(): Observable<CreateIngreso_Firebase[]> {
    console.log(this.mmsService.idEntidad);
    this.ingresosCollection = this.afs.collection<CreateIngreso_Firebase>('ingresos', ref => ref.where('Id_Entidad', '==', this.mmsService.idEntidad).orderBy('Fecha', 'desc'));
    // this.ingresosCollection = this.afs.collection<CreateIngreso_Firebase>('ingresos', ref => ref.orderBy('Fecha', 'desc'));
    return this.ingresos = this.ingresosCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as CreateIngreso_Firebase;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getEntidadById(uid : string) {
    this.entidadDoc =  this.afs.doc<EntidadI>(`/entidades/${uid}`);
    return this.entidadDoc.valueChanges().pipe(
      map((resu: EntidadI) => resu.idEntidad)
    );
  }


  addIngreso(newIngreso: CreateIngreso_Firebase) {
    return this.ingresosCollection.add(newIngreso);
  }

  updateBook(book: CreateIngreso_Firebase): void {
    let idBook = book.id;
    book.Id_Entidad = 1;
    this.ingresodDoc = this.afs.doc<CreateIngreso_Firebase>(`ingresos/${idBook}`);
    this.ingresodDoc.update(book);
  }

  deleteBook(id: string): void {
    console.log(id);
    this.ingresodDoc = this.afs.doc<CreateIngreso_Firebase>(`ingresos/${id}`);
    this.ingresodDoc.delete();
  }

}
