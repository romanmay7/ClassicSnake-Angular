import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GameRecord } from '../data_models/gamerecord.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalVariable } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gamescore:number=0;
  highscores:GameRecord[]

  constructor(private router: Router,private http: HttpClient) { }

  incrementScore()
  {
    this.gamescore+=10;
  }

  resetScore()
  {
    this.gamescore=0;
  }

  gameOver()
  {
    alert("Game Over,your Score is:"+this.gamescore)
    var person = prompt("Please enter your name", "Anonymous");

    //Send Gasme Score Record to Backend and Store it


    this.resetScore();
    this.router.navigate(["/"])
    setTimeout(function(){ window.location.reload(); }, 500);
  }

  async loadHighScores()
   {
    this.highscores = await this.http.get<GameRecord[]>(GlobalVariable.BASE_API_URL+"api/HighScores/GetHighScoresList").toPromise();
   }
    
}
