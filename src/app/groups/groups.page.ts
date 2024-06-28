import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user.model';
import { UserService } from '../shared/services/user.service';
import { Group } from '../shared/model/group.model';
import { GroupService } from '../shared/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  user: User | undefined;
  groups: Group[] = [];

  constructor(
    private userService: UserService,
    private groupService: GroupService
  ) { }

  ngOnInit() {        
  }

  ionViewWillEnter() {
    this.user = this.userService.geLoggedUser();
    this.groups = this.groupService.getAllGroups();   
  }

}
