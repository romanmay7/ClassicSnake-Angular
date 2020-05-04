import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { TitleScreenComponent } from './components/title-screen/title-screen.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { HighscoresListComponent } from './components/highscores-list/highscores-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GameScreenComponent,
    TitleScreenComponent,
    HighscoresListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
