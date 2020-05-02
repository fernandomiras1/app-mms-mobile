import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Categoria, SubCategoria, CreateIngreso } from '../model/ingresos.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MmsService {
  
  private resourceUrl = environment.apiUrl;

  public idEntidad: number;     
  constructor(private http:HttpClient) {
    this.idEntidad =  Number(localStorage.getItem('id'));
  }

  getCategorias(idTipo: number) {
    return this.http.get<Categoria[]>(`${this.resourceUrl}/config/cate/${this.idEntidad}/${idTipo}`);
  }

  get_Sub_categorias(idCate: number) {
    return this.http.get<SubCategoria[]>(`${this.resourceUrl}/config/sub/${this.idEntidad}/${idCate}`);
  }

  getEntidadByEmail(email: string) {
    return this.http.get<any[]>(`${this.resourceUrl}/config/${email}`).pipe(
      map((resu: any) => resu.result.id)
    );
  }
  
  createIngreso(newIngreso: CreateIngreso) {
    return this.http.post<CreateIngreso[]>(`${this.resourceUrl}/ingreso`, newIngreso);
  }


}
