import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | undefined;

  constructor() { }

  public geLoggedUser() {
    return this._user;
  }

  public authenticateUser(login: string, password: string): Observable<User> {
    this._user = new User('Ramon', 'ramaraujogomes@gmail.com', '25/01/1988');
    return of(this._user);
  }
}
