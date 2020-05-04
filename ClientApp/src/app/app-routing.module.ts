import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { HighscoresComponent } from './components/highscores/highscores.component';
import { TitleScreenComponent } from './components/title-screen/title-screen.component';


const routes: Routes = [
  {path:'',component:TitleScreenComponent},
  {path:'game',component:GameScreenComponent},
  {path:'highscores',component:HighscoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
