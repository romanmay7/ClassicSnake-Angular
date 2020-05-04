import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gamescore:number=0;

  constructor(private router: Router) { }

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
    this.resetScore();
    this.router.navigate(["/"])
    setTimeout(function(){ window.location.reload(); }, 500);
  }
    
}
