import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userLogin: UserLogin = new UserLogin()

  botaoClicado() {
    let inputSenha = document.querySelector('#IdSenha')

    if(inputSenha?.getAttribute('type') == 'password') {
      inputSenha.setAttribute('type', 'text')
    } else {
      inputSenha?.setAttribute('type', 'password')
    }
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login() {
    this.auth.login(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.token = this.userLogin.token
      environment.id = this.userLogin.Id
      
      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500) {
        alert("Usuário ou senha estão incorretas")
      }
    })
  }

}
