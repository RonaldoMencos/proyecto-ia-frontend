import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  analizarTexto(texto: any) {
    return this.http.post('http://localhost:3000/api/analize', texto);
  }

  getData() {
    return this.http.get('http://localhost:3000/api/get-data');
  }
}
