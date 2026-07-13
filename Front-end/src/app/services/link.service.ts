import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LinkRequest, LinkResponse, Estatisticas } from '../models/link.model';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  encurtarLink(data: LinkRequest): Observable<LinkResponse> {
    return this.http.post<LinkResponse>(`${this.apiUrl}/encurtar`, data);
  }
  gerarQrcode(codigo: string): Observable<{ qrcode: string }> {
    return this.http.get<{ qrcode: string }>(`${this.apiUrl}/qrcode/${codigo}`);
  }
  verificarSenha(
    codigo: string,
    senha: string,
  ): Observable<{ urlOriginal: string }> {
    return this.http.post<{ urlOriginal: string }>(`${this.apiUrl}/acessar`, {
      codigo,
      senha,
    });
  }
  redirecionarLink(codigo: string): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/${codigo}`);
  }
  acessarLink(codigo: string):Observable<{temSenha: boolean, totalCliques: number}>{
    return this.http.get<{temSenha: boolean; totalCliques: number}>(`${this.apiUrl}/${codigo}`)
  }
  
  buscarEstatisticas(): Observable<Estatisticas> {
    return this.http.get<Estatisticas>(`${this.apiUrl}/estatisticas`);
  }
}
