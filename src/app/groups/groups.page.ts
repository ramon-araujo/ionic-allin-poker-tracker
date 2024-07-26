import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../shared/model/user.model';
import { UserService } from '../shared/services/user.service';
import { Group } from '../shared/model/group.model';
import { GroupService } from '../shared/services/group.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit, OnDestroy {

  private _user$: Subscription | undefined;
  private _groups$: Subscription | undefined;

  user: User | undefined;
  groups: Group[] = [];

  constructor(
    private userService: UserService,
    private groupService: GroupService
  ) {     
  }

  ngOnInit() {        
    this._user$ = this.userService.getLoggedUserObs().subscribe(user => this.user = user);
    this._groups$ = this.groupService.getAllGroups().subscribe((groups => this.groups = groups));
  }

  ngOnDestroy(): void {
    if (this._user$) {
      this._user$.unsubscribe();
    }
    if (this._groups$) {
      this._groups$.unsubscribe();
    }
  }
}
