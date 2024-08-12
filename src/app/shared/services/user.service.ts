import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, getDoc, Timestamp } from '@angular/fire/firestore';
import { Preferences } from '@capacitor/preferences';
import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, concatMap, from, map, Observable, tap } from 'rxjs';
import { ErrorEnum } from '../enums/error-enum';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private AUTH_DATA_KEY = 'loggedUser';
  private _user = new BehaviorSubject<User | undefined>(undefined);
    

  constructor(private db: Firestore, private auth: Auth) { }  

  public getLoggedUserObs(): Observable<User | undefined> {
    return this._user.asObservable();
  }

  public getLoggedUser() {
    return this._user.getValue();
  }

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
    }));
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
          this._user.next(user);
        }
      }),
      map(user => {        
        return !!user;
      })
    );
  }
  
  private createSessionForUser(user: User) {
    const userData = { key: this.AUTH_DATA_KEY, value: JSON.stringify(user)};
    return from(Preferences.set(userData)).pipe(tap(() => this._user.next(user)));
  }

  public logout() {
    return from(signOut(this.auth)).pipe(
      tap(() => from(Preferences.remove({ key: this.AUTH_DATA_KEY }))),
      tap(() => this._user.next(undefined))
    );          
  }
}
