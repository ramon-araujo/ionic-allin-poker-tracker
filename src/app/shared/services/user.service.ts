import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | undefined;

  constructor() { }

  public geLoggedUser() {
    return this.user;
  }

  public authenticateUser(login: string, password: string): Observable<User> {
    this.user = new User('Ramon', 'ramaraujogomes@gmail.com', '25/01/1988')
    return of(this.user);
  }
}
