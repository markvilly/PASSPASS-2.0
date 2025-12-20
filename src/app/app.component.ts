import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { LandingComponent } from './components/landing/landing.component';
import { SpotlightComponent } from './components/spotlight/spotlight.component';
import { SupportersComponent } from './components/supporters/supporters.component';
import { EssentialsComponent } from './components/essentials/essentials.component';
import { FooterComponent } from './components/footer/footer.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    AudioPlayerComponent,
    LandingComponent,
    SpotlightComponent,
    SupportersComponent,
    EssentialsComponent,
    FooterComponent,
    SubscribeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PassPass';
  subscribeOpen = false;

  openSubscribe(): void {
    this.subscribeOpen = true;
  }

  closeSubscribe(): void {
    this.subscribeOpen = false;
  }
}
