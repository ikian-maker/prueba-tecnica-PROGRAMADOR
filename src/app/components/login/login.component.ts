import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor( private _userService: UserService,
    private router: Router ) { }

  ngOnInit(): void {
  }

  login() {

    // Validamos que el usuario ingrese datos
    if(this.username == '' || this.password == ''){
      alert('Todos los campos son obligatorios');
      return;
    }

    // Creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password
    }

    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/boton-de-pagos']);   
        console.log(token);
      },
      error: (e: HttpErrorResponse) => {
        this.msgError(e);
      }
    });

  };

    msgError(e: HttpErrorResponse){
      if(e.error.msg){
          alert(e.error.msg + '...Error')
      } else {
        alert('No se pudo conectar con el servidor' + '...Error')
      };
  };
}
