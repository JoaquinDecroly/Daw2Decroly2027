import { Component } from '@angular/core';

import { HeroComponentComponent } from './components/hero-component/hero-component.component';
import { DestinationCardComponent } from './components/destination-card/destination-card.component';
import {
  ExperienceBannerComponent
} from './components/experience-banner/experience-banner.component';

@Component({
  selector: 'app-root',
  imports: [
    HeroComponentComponent,
    DestinationCardComponent,
    ExperienceBannerComponent
  ],
  templateUrl: './app.html',
})
export class App {}
