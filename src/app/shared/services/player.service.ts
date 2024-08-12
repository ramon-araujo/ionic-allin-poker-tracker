import { Injectable } from '@angular/core';
import { Player } from '../model/player.model';
import { Group } from '../model/group.model';
import { collectionGroup, Firestore, getDocs, query, QuerySnapshot, where } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import { convertSnapshots } from './db-utils';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private collectionName = 'players';

  constructor(
    private db: Firestore,
    private userService: UserService) { }

  addGroupMember(player: Player, group:Group) {

  }

  getAllPlayersByUser(userId: string) {
    const playersCollection = collectionGroup(this.db, this.collectionName);
    const playerQuery = query(playersCollection, where('user', '==', userId));
    
    return from(getDocs(playerQuery)).pipe(map(result => {            
      return this.convertPlayerSnapshot(result);
    }));
  }

  getAllPlayerFromGroup(groupId: string) {    
    const playersCollection = collectionGroup(this.db, this.collectionName);
    const playerQuery = query(playersCollection, where('groupId', '==', groupId));

    return from(getDocs(playerQuery)).pipe(map(result => {
      return this.convertPlayerSnapshot(result);
    }));
  }

  private convertPlayerSnapshot(result: QuerySnapshot): Player[] {    
    return result.docs.map(doc => {
      const loggedUser = this.userService.getLoggedUser();
      const playerData = doc.data();      
      const user = playerData['user'] === loggedUser?.id ? loggedUser : null;          

      return new Player(doc.id, playerData['name'], playerData['groupId'], user || null);
    });
  }
}
