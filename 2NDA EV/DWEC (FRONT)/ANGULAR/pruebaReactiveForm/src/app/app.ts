import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioReactive } from './components/formulario-reactive/formulario-reactive';

@Component({
  imports: [FormularioReactive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pruebaReactiveForm');
}
