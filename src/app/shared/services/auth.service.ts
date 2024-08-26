import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, from, map, tap } from 'rxjs';
import { User } from '../model/user.model';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, Timestamp, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { GroupService } from './group.service';
import { ErrorEnum } from '../enums/error-enum';
import { Preferences } from '@capacitor/preferences';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_DATA_KEY = 'loggedUser';  

  constructor(private db: Firestore, 
    private auth: Auth,
    private groupService: GroupService,
    private userService: UserService
  ) { }

  public authenticateUserByLoginAndPasswd(login: string, password: string): Observable<void> {        
    let userId: string;
    let token: string;
    return from(signInWithEmailAndPassword(this.auth, login, password)).pipe(      
      concatMap(userCred => {                
        userId = userCred.user.uid;
        return from(userCred.user.getIdToken());         
      }),
      concatMap(receivedToken => {        
        token = receivedToken;
        const userRef = doc(this.db, 'users', userId);
        return from(getDoc(userRef));
      }),
      concatMap(userSnap => {                
        if (!userSnap.exists()) {
          throw new Error(ErrorEnum.DADOS_USUARIO_NAO_ENCONTRADOS);
        }
        const userData = userSnap.data();
        const name = userData['name'];
        const birthDate = userData['birthDate'] ? userData['birthDate'].toDate() : undefined;
        return this.createSessionForUser(new User(userId, login, name, birthDate, token));
      }),
      concatMap(() => this.groupService.reloadGroups(userId))
    );
  }
  
  public createUser(name: string, email: string, password: string, birthDate: Date): Observable<void> {
    let userId: string;
    let token: string;
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      concatMap(userCred => {      
        userId = userCred.user.uid;      
        return from(userCred.user.getIdToken());
      }),
      concatMap(receivedToken => {        
        token = receivedToken;
        const docRef = doc(this.db, 'users', userId);
        
        const newUser = {          
          name: name,
          email: email,
          birthDate: Timestamp.fromDate(birthDate)
        }
        return from(setDoc(docRef, newUser))
      }),
      concatMap(() => this.createSessionForUser(new User(userId, email, name, birthDate, token)))
    );
  }

  public autoLogin() {
    return from(Preferences.get({key: this.AUTH_DATA_KEY})).pipe(
      map( storedData =>{          
        if (!storedData || !storedData.value) {
          return null;
        }
        return JSON.parse(storedData.value) as User;
      }),
      tap(user => {        
        if (user) {
          this.userService.updateLoggedUser(user);
        }
      }),
      map(user => user ? user.id : null),
      concatMap(userId => this.groupService.reloadGroups(userId))      
    );
  }
  
  private createSessionForUser(user: User) {
    const userData = { key: this.AUTH_DATA_KEY, value: JSON.stringify(user)};
    return from(Preferences.set(userData)).pipe(tap(() => this.userService.updateLoggedUser(user)));
  }

  public logout() {
    return from(signOut(this.auth)).pipe(
      tap(() => from(Preferences.remove({ key: this.AUTH_DATA_KEY }))),
      tap(() => this.userService.updateLoggedUser(undefined))
    );          
  }
}
