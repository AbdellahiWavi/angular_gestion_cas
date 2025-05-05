import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TypeCas } from '../typeCas';

@Injectable({
  providedIn: 'root'
})
export class TypeCasService {
  
  private readonly gestionCasApi = environment.gestionCasApi;

  constructor(
    private http: HttpClient
  ) { }

  getTypesCas(): Observable<TypeCas[]> {
    return this.http.get<TypeCas[]>(`${this.gestionCasApi}/typeCas/all`);
  }

  addTypeCas(typeCas: TypeCas): Observable<void> {
    return this.http.post<void>(`${this.gestionCasApi}/typeCas/add`, typeCas);
  }

  updateTypeCas(typeCas: TypeCas): Observable<TypeCas> {
    return this.http.put<TypeCas>(`${this.gestionCasApi}/typeCas/update`, typeCas);
  }

  deleteTypeCas(typeCasId?: number): Observable<void> {
    return this.http.delete<void>(`${this.gestionCasApi}/typeCas/delete/${typeCasId}`);
  }
}
