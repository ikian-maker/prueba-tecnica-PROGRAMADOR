import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent implements OnInit{
  username: string = '';
  password: string = '';
  confirmPassword:  string = '';


  constructor( private router: Router, 
    private _userService: UserService,) { }
  // Implementación del método ngOnInit
  ngOnInit(): void {   
  }

  addUser() {

    //Validamos que el usuario ingrese valores
    if(this.username == '' || this.password == '' || this.confirmPassword == '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    //Validamos que las password sean iguales
    if(this.password != this.confirmPassword) {
      alert('Las passwords deben ser identicas')
      return;
    }

    //Creamos el objeto 
    const user: User = {
      username: this.username,
      password: this.password
    }


    //User
    this._userService.signIn(user).subscribe({
      next: (v) => {
         alert(`Usuario "${this.username}" registrado con exito`);
         this.router.navigate(['/login]']);
      },
      error: (e: HttpErrorResponse) => {
          this.msgError(e)
      }
    });
  }


  msgError(e: HttpErrorResponse){
      if(e.error.msg){
          alert(e.error.msg + '...Error')
      } else {
        alert('No se pudo conectar con el servidor' + '...Error')
      };
  };
};
