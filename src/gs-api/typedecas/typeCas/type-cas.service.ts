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

  disableTypeCas(typeCasId: number): Observable<void> {
    return this.http.put<void>(`${this.gestionCasApi}/typeCas/isActive/${typeCasId}`, {});
  }
}
