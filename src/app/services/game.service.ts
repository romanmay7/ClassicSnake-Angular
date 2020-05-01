import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gamescore:number=0;

  constructor() { }

  incrementScore()
  {
    this.gamescore+=10;
  }

  resetScore()
  {
    this.gamescore=0;
  }
}
