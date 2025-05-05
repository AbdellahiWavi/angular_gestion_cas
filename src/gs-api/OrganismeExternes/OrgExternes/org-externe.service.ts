import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { OrgExterne } from '../OrgExterne';

@Injectable({
  providedIn: 'root'
})
export class OrgExterneService {
  private readonly gestionCasApi = environment.gestionCasApi;

  constructor(
    private http: HttpClient
  ) { }

  getOrgExternes(): Observable<OrgExterne[]> {
    return this.http.get<OrgExterne[]>(`${this.gestionCasApi}/organismeext/all`);
  }

  addOrgExterne(organismeext: OrgExterne): Observable<void> {
    return this.http.post<void>(`${this.gestionCasApi}/organismeext/add`, organismeext);
  }

  updateOrgExterne(OrgExterne: OrgExterne): Observable<OrgExterne> {
    return this.http.put<OrgExterne>(`${this.gestionCasApi}/organismeext/update`, OrgExterne);
  }

  deleteOrgExterne(OrgExterneId?: number): Observable<void> {
    return this.http.delete<void>(`${this.gestionCasApi}/organismeext/delete/${OrgExterneId}`);
  }

  findOrgExt(orgExtId: number): Observable<OrgExterne> {
    return this.http.get<OrgExterne>(`${this.gestionCasApi}/organismeext/find/${orgExtId}`);
  }

  uploadImg(imgUrl: FormData | null): Observable<string> {
    return this.http.post<string>(`${this.gestionCasApi}/images/upload`, imgUrl, {responseType: 'text' as 'json'});
  }

}
