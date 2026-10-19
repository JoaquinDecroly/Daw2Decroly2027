import { Component, signal } from '@angular/core';
import { ComponenteHijoComponents } from './components/componente-hijo/componente-hijo.components';
import {
  ComponenteHijo2Components
} from './components/componente-hijo2/componente-hijo2.components';
import {
  ComponenteHijo3Components
} from './components/componente-hijo3/componente-hijo3.components';

@Component({
  imports: [
    ComponenteHijoComponents,
    ComponenteHijo2Components,
    ComponenteHijo3Components
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('primeraAppAngular');
}
