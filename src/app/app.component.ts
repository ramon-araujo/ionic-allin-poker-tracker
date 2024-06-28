import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private router: Router) {}


  public onLogout(): void {
    this.userService.logout();
    this.router.navigateByUrl("/login");
  }

}
