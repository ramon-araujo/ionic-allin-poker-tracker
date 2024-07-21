import { Injectable } from '@angular/core';
import { Group } from '../model/group.model';
import { Player } from '../model/player.model';
import { User } from '../model/user.model';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private url = 'https://firestore.googleapis.com/v1/projects/allin-poker-tracker/databases/(default)/documents/groups.json';

  private _groups: 
  Group[] = [
    new Group('1', 'Poker das antigas', '', '',
      [
        new Player('Ramon', new User('abc', 'Ramon', 'ramaraujogomes@gmail.com', '', '25/01/1988')),
        new Player('Davi', undefined),
        new Player('Nikito', undefined),
        new Player('Daniel', undefined),
        new Player('Brenno', undefined),
        new Player('Thalinho', undefined),
        new Player('Paulista', undefined),
      ], []),
      new Group('2', 'Outro grupo de poker', '', '', [], []),
  ];

  constructor(private http: HttpClient) { }

  public getAllGroups(): Group[] {
    return [...this._groups];
  }

  public createNewGroup(name: string, description: string, imagePath: string, players: Player[]): Observable<any> {
    const newGroup = new Group(null, name, description, imagePath, players, []);

    return this.http.post(this.url, newGroup).pipe(tap(resultData => {
      console.log(resultData)
    }));
    //this._groups.push(newGroup);    
    //return of(newGroup);
  }

  public findById(id: string): Group | undefined {    
    return this._groups.find((group) => group.id === id);
  }
}
