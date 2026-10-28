import { Component } from '@angular/core';
import { Cesta } from './components/cesta/cesta';

@Component({
  imports: [Cesta],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
