import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { HighscoresComponent } from './components/highscores/highscores.component';
import { TitleScreenComponent } from './components/title-screen/title-screen.component';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GameScreenComponent,
    HighscoresComponent,
    TitleScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
