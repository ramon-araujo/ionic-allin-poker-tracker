import { Injectable } from '@angular/core';
import { Group } from '../model/group.model';
import { Player } from '../model/player.model';
import { User } from '../model/user.model';
import { BehaviorSubject, concatMap, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { addDoc, collection, Firestore, query } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { onSnapshot, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private collectionName = 'groups';
  private _groups = new BehaviorSubject<Group[]>([]);

  constructor(
    private db: Firestore, 
    private userService: UserService) { }

  public getAllGroupsObs() {
    return this._groups.asObservable();
  }

  public reloadGroups() {    
    const user = this.userService.getLoggedUser();

    const groupsCollection = collection(this.db, this.collectionName);
    // const groupsByUserQuery = query(groupsCollection, where('players', '==', value));

    onSnapshot(groupsCollection, querySnapshot => {

    });

  }

  public createNewGroup(name: string, description: string, imagePath: string, players: Player[]) {
    const newGroupData = {
      name: name,
      description: description,
      imagePath: imagePath,      
    };    
    
    const groupsCollection = collection(this.db, this.collectionName);
    return from(addDoc(groupsCollection, newGroupData)).pipe(
      map(docRef => {        
        const newGroup = {id: docRef.id, ...newGroupData} as Group;

        const groups = [...this._groups.getValue()];
        groups.push(newGroup);
        
        this._groups.next(groups);

        return newGroup;
      })
    );
  }

  public findById(id: string) {    
    return this._groups.getValue().find(group => group.id === id);
  }
}
