import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-authenticate-form',
  templateUrl: './authenticate-form.component.html',
  styleUrls: ['./authenticate-form.component.scss'],
})
export class AuthenticateFormComponent  implements OnInit {

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {}

  onAuthenticate() {
    this.userService.authenticateUser('', '').subscribe(user => {
      this.router.navigate(['/', 'groups']);
    });
  }

}
