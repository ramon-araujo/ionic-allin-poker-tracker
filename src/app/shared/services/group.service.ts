import { Injectable } from '@angular/core';
import { Group } from '../model/group.model';
import { Player } from '../model/player.model';
import { User } from '../model/user.model';
import { BehaviorSubject, concatMap, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { addDoc, collection, collectionGroup, doc, Firestore, getDoc, getDocs, query, runTransaction } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { onSnapshot, where } from 'firebase/firestore';
import { PlayerService } from './player.service';
import { convertSnapshots } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private collectionName = 'groups';

  private _groups = new BehaviorSubject<Group[]>([]);

  constructor(
    private db: Firestore,
    private playerService: PlayerService) { }

  public getAllGroupsObs() {
    return this._groups.asObservable();
  }

  public reloadGroups(userId: string | null): Observable<void> {            
    if (userId) {      
      return this.playerService.getAllPlayersByUser(userId).pipe(
        map(players => players.map(player => player.groupId)),
        concatMap(groupIds => {                       
          if (groupIds.length == 0) {
            return of([]);
          }
          const groupsCollection = collection(this.db, this.collectionName);
          const groupsQuery = query(groupsCollection, where('__name__', 'in', groupIds));
          return from(getDocs(groupsQuery)).pipe(map(result => convertSnapshots<Group>(result)));
        }),
        map(groups => {          
          this._groups.next([...groups]);
        })
      )
    }  
    
    return of();
  }

  public createNewGroup(name: string, description: string, imagePath: string, players: Player[]): Observable<Group> {
    const newGroupData = {
      name: name,
      description: description,
      imagePath: imagePath,      
    };    
    
    let groupId = '';
    let playersList: Player[] = [];

    return from(runTransaction(this.db, async (transaction) => {

      const groupDoc = doc(collection(this.db, this.collectionName));
      groupId = groupDoc.id;

      transaction.set(groupDoc, newGroupData);
      
      const playersCollectionName = 'players';
      players.forEach(player => {
        const playerData = player.user ? 
          { name: player.name, user: player.user.id, groupId: groupId } : 
          { name: player.name, groupId: groupId };        

        const playerDoc = doc(collection(this.db, playersCollectionName));
        transaction.set(playerDoc, playerData);

        playersList.push({id: playerDoc.id, ...playerData} as Player);
      });      
    })).pipe(map(() => {
      const newGroup = {id: groupId, ...newGroupData, players: playersList} as Group;

      const groups = [...this._groups.getValue()];
      groups.push(newGroup);
      
      this._groups.next(groups);

      return newGroup;
    }));    
  }

  public findById(id: string) {    
    return this._groups.getValue().find(group => group.id === id);
  }
}
