import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Categoria, SubCategoria } from '../model/ingresos.model';


@Injectable({
  providedIn: 'root'
})
export class MmsService {
  
  api_key = '89937fd3672b4349aa1486f1c80d1189';
  private resourceUrl = environment.apiUrl + '/config';

  constructor(private http:HttpClient) { }


  getCategorias(idTipo: number) {
    const idEntidad = 1;
    return this.http.get<Categoria[]>(`${this.resourceUrl}/cate/${idEntidad}/${idTipo}`);
  }

  get_Sub_categorias(idCate: number) {
    const idEntidad = 1;
    return this.http.get<SubCategoria[]>(`${this.resourceUrl}/sub/${idEntidad}/${idCate}`);
  }

  getArticlesByID(source: String){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key);
  }



}
