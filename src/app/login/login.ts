import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
//comentario
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  username = signal('');
  password = signal('');

  login() {
    console.log('Usuario:', this.username());
    console.log('Contraseña:', this.password());
    alert(`Bienvenido, ${this.username()}`);
  }
}