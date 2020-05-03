import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CreateIngreso_Firebase } from '../model/ingresos.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  constructor(private afs: AngularFirestore) { }
  private ingresosCollection: AngularFirestoreCollection<CreateIngreso_Firebase>;
  
  getAllIngresos(): Observable<CreateIngreso_Firebase[]> {
    this.ingresosCollection = this.afs.collection<CreateIngreso_Firebase>('ingresos');
    return this.ingresosCollection.valueChanges();
  }


  addIngreso(newIngreso: CreateIngreso_Firebase) {
    console.log(newIngreso);
    // return this.booksCollection.add(newIngreso);
    return this.afs.collection('ingresos').add(newIngreso);
  }
  updateBook(book: CreateIngreso_Firebase): void {
    // let idBook = book.id;
    // this.bookDoc = this.afs.doc<CreateIngreso_Firebase>(`books/${idBook}`);
    // this.bookDoc.update(book);
  }

  deleteBook(idBook: string): void {
    // this.bookDoc = this.afs.doc<CreateIngreso_Firebase>(`books/${idBook}`);
    // this.bookDoc.delete();
  }

}
