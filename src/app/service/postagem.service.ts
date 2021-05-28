import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagens } from '../model/Postagens';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<Postagens[]>{
    return this.http.get<Postagens[]>('http://localhost:8080/postagens', this.token)
  }

  postPostagem(postagem: Postagens):Observable<Postagens>{
    return this.http.post<Postagens>('http://localhost:8080/postagens',postagem ,this.token)

  }
}
