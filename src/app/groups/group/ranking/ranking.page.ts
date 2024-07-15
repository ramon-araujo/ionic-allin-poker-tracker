import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/model/player.model';
import { Position } from 'src/app/shared/model/position.model';
import { Ranking } from 'src/app/shared/model/ranking.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {  

  ranking: Ranking = new Ranking(
    [
      new Position(new Player("Ramon", undefined), 7, 2, 3, 5, 3, 54, 4, 246, 35.14),
      new Position(new Player("Davi", undefined), 5, 2, 3, 5, 3, 45, 4, 375, 35.14),
      new Position(new Player("Daniel", undefined), 6, 2, 2, 5, 3, 41, 4, 273, 35.14),
      new Position(new Player("Brenno", undefined), 7, 0, 3, 5, 3, 38, 4, -108, 35.14),
      new Position(new Player("Paulista", undefined), 7, 1, 3, 5, 3, 33, 4, -125, 35.14),
      new Position(new Player("Thalinho", undefined), 7, 0, 3, 5, 3, 31, 4, 8, 35.14),
      new Position(new Player("Nikito", undefined), 7, 0, 0, 5, 3, 10, 4, -480, 35.14),
    ]
  );

  renderByPoints = true;

  constructor() { }

  ngOnInit() {
    this.showRankingByPoints();
  }

  ionViewWillEnter() {

  }

  showRankingByBalance() {
    this.ranking.positions = this.ranking.positions.sort((pos1, pos2) => pos2.balance - pos1.balance );
    this.renderByPoints = false;
  }

  showRankingByPoints() {
    this.ranking.positions = this.ranking.positions.sort((pos1, pos2) => pos2.points - pos1.points );
    this.renderByPoints = true;
  }
}
