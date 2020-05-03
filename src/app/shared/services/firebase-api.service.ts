import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CreateIngreso } from '../model/ingresos.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  constructor(private afs: AngularFirestore) { }
  private booksCollection: AngularFirestoreCollection<CreateIngreso>;
  private bookDoc: AngularFirestoreDocument<CreateIngreso>;

  public selectedBook: any = {
    id: null
  };

  // getAllBooks() {
  //   this.booksCollection = this.afs.collection<CreateIngreso>('books');
  //   return this.books = this.booksCollection.snapshotChanges()
  //     .pipe(map(changes => {
  //       return changes.map(action => {
  //         const data = action.payload.doc.data() as CreateIngreso;
  //         // // data.id = action.payload.doc.id;
  //         return data;
  //       });
  //     }));
  // }




  addIngreso(newIngreso: CreateIngreso) {
    console.log(newIngreso);
    // return this.booksCollection.add(newIngreso);
    return this.afs.collection('ingresos').add(newIngreso);
  }
  updateBook(book: CreateIngreso): void {
    // let idBook = book.id;
    // this.bookDoc = this.afs.doc<CreateIngreso>(`books/${idBook}`);
    // this.bookDoc.update(book);
  }

  deleteBook(idBook: string): void {
    this.bookDoc = this.afs.doc<CreateIngreso>(`books/${idBook}`);
    this.bookDoc.delete();
  }

}
