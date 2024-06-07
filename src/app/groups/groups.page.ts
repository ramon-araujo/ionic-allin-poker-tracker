import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  user: User | undefined;
  

  constructor(private userService: UserService) {
    this.user = this.userService.geLoggedUser();
   }

  ngOnInit() {    
  }

}
