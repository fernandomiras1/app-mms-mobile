import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MmsService {
  
  api_key = '89937fd3672b4349aa1486f1c80d1189';
  private resourceUrl = environment.apiUrl + '/config';

  constructor(private http:HttpClient) { }


  getCategorias() {
    const idEntidad = 1;
    const idTipo = 1;
    return this.http.get<any[]>(`${this.resourceUrl}/${idEntidad}/${idTipo}`);
  }

  getArticlesByID(source: String){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key);
  }



}
