import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Categoria, SubCategoria, CreateIngreso } from '../model/ingresos.model';


@Injectable({
  providedIn: 'root'
})
export class MmsService {
  
  private resourceUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getCategorias(idTipo: number) {
    const idEntidad = 1;
    return this.http.get<Categoria[]>(`${this.resourceUrl}/config/cate/${idEntidad}/${idTipo}`);
  }

  get_Sub_categorias(idCate: number) {
    const idEntidad = 1;
    return this.http.get<SubCategoria[]>(`${this.resourceUrl}/config/sub/${idEntidad}/${idCate}`);
  }
  
  createIngreso(newIngreso: CreateIngreso) {
    console.log(newIngreso);
    return this.http.post<CreateIngreso[]>(`${this.resourceUrl}/ingreso`, newIngreso);
  }


}
