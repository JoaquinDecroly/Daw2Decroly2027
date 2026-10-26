import { Component, signal } from '@angular/core';
import { Blog } from './components/blog/blog';

@Component({
  imports: [Blog],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('AC2Blogging');
}
