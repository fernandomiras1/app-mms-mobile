import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { map } from 'rxjs/operators';

// No hace falta declararlo en mi app.moduletsts porque esta injectado de esta forma
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private afDB: AngularFirestore ) { }

  // con FireBase podemos obtener la info del usuario que se encuentra logeado en ese momento. 
  // Si es null es porque no esta logeado
  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  // cerrar session
  logoutUser() {
    this.afAuth.signOut();
    localStorage.removeItem('uid');
  }

  // Verficamos si esta logeado
  // este metodo devuelve un observable
  authFirebase() {
   return this.afAuth.authState.pipe(
    map( fbUser => fbUser == null ? true : false ));
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

}
