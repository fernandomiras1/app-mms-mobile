import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { MmsService } from '../shared/services/mms-api.service';

@Injectable({
    providedIn: 'root'
})
export class PagesResolverService implements Resolve<number> {
    constructor(
        private mmsService: MmsService,
        private router:Router
    ){ }

    resolve():Observable<number> {
        const email = localStorage.getItem('user-email');

        if (email) {
            return this.mmsService.getEntidadByEmail(email);
        } else {
            console.log('entra aca');
            return EMPTY;
        }
    }

}

