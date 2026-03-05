import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Imagen } from './imagen/imagen';
import { Login } from './login/login';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Imagen],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('clase-4');
}