import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GameRecord } from '../data_models/gamerecord.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalVariable } from '../../global';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gamescore:number=0;
  scoresPerApple=10;
  highscores:GameRecord[]
  playerName:string="Anonymous";

  constructor(private router: Router,private http: HttpClient,public datepipe: DatePipe) { }

  incrementScore()
  {
    this.gamescore+=this.scoresPerApple;
  }

  resetScore()
  {
    this.gamescore=0;
  }
//--------------------------------------------------------------------------------------------------------------------------------
  async gameOver()
  {
    alert("Game Over,your Score is:"+this.gamescore)

    this.playerName = prompt("Please enter your name", "Anonymous");
    let date=Date.now();
    let current_date =this.datepipe.transform(date, 'dd/MM/yyyy');
    //Send Game Score Record to Backend and Store it
    let currentGameScore=new GameRecord(this.gamescore,this.playerName,current_date.toString())
    await this.saveGameScore(currentGameScore);

    this.resetScore();
    this.router.navigate(["/"])
    setTimeout(function(){ window.location.reload(); }, 500);

  }
//---------------------------------------------------------------------------------------------------------------------------------
  async loadHighScores()
   {
    this.highscores = await this.http.get<GameRecord[]>(GlobalVariable.BASE_API_URL+"api/HighScores/GetHighScoresList",).toPromise();
   }
//---------------------------------------------------------------------------------------------------------------------------------

    saveGameScore(score:GameRecord)
   {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    
    this.http.post<any>(GlobalVariable.BASE_API_URL+"api/HighScores/AddNewRecord", JSON.stringify(score),{ 'headers': headers }).subscribe(data => {
      console.log("Your Score was saved on Server");


    })
   }
//-----------------------------------------------------------------------------------------------------------------------------------   
}
