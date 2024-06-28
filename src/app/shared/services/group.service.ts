import { Injectable } from '@angular/core';
import { Group } from '../model/group.model';
import { Player } from '../model/player.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private _groups: Group[] = [
    new Group('1', 'Poker das antigas', '',
      [
        new Player('Brenno', new User('Ramon', 'ramaraujogomes@gmail.com', '25/01/1988')),
        new Player('Davi', undefined),
        new Player('Nikito', undefined),
        new Player('Daniel', undefined),
        new Player('Ramon', undefined),
        new Player('Thalinho', undefined),
        new Player('Paulista', undefined),
      ], []),
      new Group('2', 'Outro grupo de poker', '', [], []),
  ];

  constructor() { }

  public getAllGroups(): Group[] {
    return [...this._groups];
  }

  public findById(id: string): Group | undefined {
    return this._groups.find((group) => group.id === id);
  }
}
