import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagens } from '../model/Postagens';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagens = new Postagens()
  listaPostagens: Postagens[]
  
  tema: Tema = new Tema()
  idTema:number
  listaTemas: Tema[]

  user: User = new User()
  idUser = environment.id


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if (environment.token == '') {
      this.router.navigate(['/login'])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp:Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagens[]) => {
      this.listaPostagens = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.Id = this.idUser
    this.postagem.usuarios = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagens) => {
      this.postagem = resp
      alert("Postagem realizada com sucesso!")
      this.postagem = new Postagens()
    })

  }



}
