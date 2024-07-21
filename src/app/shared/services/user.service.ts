import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { concatMap, from, map, Observable, of } from 'rxjs';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { convertSnapshots } from './db-utils';
import { ErrorEnum } from '../enums/error-enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection = collection(this.db, 'users');

  private _user: User | undefined;

  constructor(private db: Firestore) { }  

  public geLoggedUser(): User | undefined {
    return this._user;
  }

  public authenticateUser(login: string, password: string): Observable<User> {
    this._user = new User('abc', 'Ramon', 'ramaraujogomes@gmail.com', '', '25/01/1988');    
    return of(this._user);    
  }
  
  public createUser(name: string, email: string, password: string): Observable<User> {

    return this.findUsersByEmail(email).pipe(concatMap(users => {
      if (users.length > 0) {
        throw new Error(ErrorEnum.USER_ALREADY_EXISTS);
      }
      
      const newUser = { 
        name: name, 
        email: email, 
        password: password,
        birthDate: ''
      };    
      
      return from(addDoc(this.usersCollection, newUser)).pipe(
        map(res => (
          {
            ...newUser,
            id: res.id              
          }
      )));   
    }));   
  }

  private findUsersByEmail(email: string): Observable<User[]> {
    const q = query(this.usersCollection, where('email', '==', email));
    return from(getDocs(q)).pipe(map(result => convertSnapshots<User>(result)));
  }

  public logout() {
    this._user = undefined;
  }
}
