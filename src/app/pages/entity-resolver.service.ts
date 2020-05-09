import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { FirebaseApiService } from '../shared/services/firebase-api.service';

@Injectable({
    providedIn: 'root'
})
export class EntityResolverService implements Resolve<any> {
    constructor(
        private firebaseService: FirebaseApiService,
        private router:Router
    ){ }

    resolve():Observable<any>{
        const uid = localStorage.getItem('uid');
		if (uid) {
			return of(this.firebaseService.getEntidadById(uid));
		} else{
            this.router.navigate(['']);
            return EMPTY;
        }
    }

}

