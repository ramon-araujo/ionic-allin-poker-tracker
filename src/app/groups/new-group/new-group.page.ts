import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.page.html',
  styleUrls: ['./new-group.page.scss'],
})
export class NewGroupPage implements OnInit {

  participantes: string[] = [];
  user: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.geLoggedUser();    
  }

  onAddMember() {
    this.participantes.push();
  }
}
