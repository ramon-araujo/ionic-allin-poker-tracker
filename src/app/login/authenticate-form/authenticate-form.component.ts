import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  
  onAuthenticateByFacebook() {
    this.authenticate('', '');
  }
  
  onAuthenticateByGoogle() {
    this.authenticate('', '');
  }
  
  private authenticate(user: string, password: string) {
    this.userService.authenticateUser(user, password).subscribe(user => {
      this.router.navigate(['/', 'groups']);
    });
  }
}
