import { Injectable } from '@angular/core';
import { Group } from '../model/group.model';
import { Player } from '../model/player.model';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private _groups: Group[] = [
    new Group('1', 'Poker das antigas', '', '',
      [
        new Player('Ramon', new User('Ramon', 'ramaraujogomes@gmail.com', '25/01/1988')),
        new Player('Davi', undefined),
        new Player('Nikito', undefined),
        new Player('Daniel', undefined),
        new Player('Brenno', undefined),
        new Player('Thalinho', undefined),
        new Player('Paulista', undefined),
      ], []),
      new Group('2', 'Outro grupo de poker', '', '', [], []),
  ];

  constructor() { }

  public getAllGroups(): Group[] {
    return [...this._groups];
  }

  public createNewGroup(name: string, description: string, imagePath: string, players: Player[]): Observable<Group> {
    const newGroup = new Group(Math.random.toString(), name, description, imagePath, players, []);
    this._groups.push(newGroup);    
    return of(newGroup);
  }

  public findById(id: string): Group | undefined {    
    return this._groups.find((group) => group.id === id);
  }
}
