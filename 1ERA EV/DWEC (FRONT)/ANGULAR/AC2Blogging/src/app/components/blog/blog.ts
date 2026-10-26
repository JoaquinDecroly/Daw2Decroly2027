import { Component } from '@angular/core';
import { Noticia } from '../noticia/noticia';

@Component({
  imports: [Noticia],
  selector: 'app-blog',
  styleUrl: './blog.css',
  templateUrl: './blog.html',
})
export class Blog {}
