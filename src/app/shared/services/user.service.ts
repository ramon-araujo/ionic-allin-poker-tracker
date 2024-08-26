import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, getDoc, Timestamp } from '@angular/fire/firestore';
import { Preferences } from '@capacitor/preferences';
import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, concatMap, from, map, Observable, of, tap } from 'rxjs';
import { ErrorEnum } from '../enums/error-enum';
import { User } from '../model/user.model';
import { GroupService } from './group.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {  
  private _user = new BehaviorSubject<User | undefined>(undefined);
    

  constructor() { }  

  public getLoggedUserObs(): Observable<User | undefined> {
    return this._user.asObservable();
  }

  public getLoggedUser() {
    return this._user.getValue();
  }

  public updateLoggedUser(user: User | undefined) {
    this._user.next(user);
  }
}
