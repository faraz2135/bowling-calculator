import { Component } from '@angular/core';
import { ApiService } from './api.service';

export interface Turn{
  id: number,
  strike: number | null,
  strikeResult: string | null, // '/', 'X', '3'
  strikeResult2?: string | null, // '/', 'X', '3'
  totalTurnScore: number | null
}

export interface Score{
  currentTurn?: Turn | null,
  totalPossibleScore?: number | null,
  remainingPins?: number | null
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pins: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  turnList: Turn[] = []
  game: Score = {};

  constructor (private apiService: ApiService) {
    for (let i=1; i<=10; i++) {
      this.turnList.push(
        {
          id: i,
          strike: null,
          strikeResult: null,
          totalTurnScore: null
        }
      )
    }
  }

  getScore(pins: number){
    this.apiService.getData({pins_knocked: pins}).subscribe(res => {
      this.resetPins(res);

      this.game = res;

      const turnIndex = this.turnList.findIndex((x: any) => x.id === res.currentTurn.id);
      this.turnList[turnIndex] = res.currentTurn;
    });
  }

  resetPins(data: any) {
    this.pins = [];
    for (let i=0; i<=data.remainingPins; i++) {
      this.pins.push(i);
    }
  }
}
