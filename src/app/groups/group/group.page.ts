import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Group } from 'src/app/shared/model/group.model';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  group: Group | undefined;

  constructor(
    private route: ActivatedRoute, 
    private navCtrl: NavController,
    private groupService: GroupService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('idGroup')) {
        const idGroup = paramMap.get('idGroup');

        if (idGroup != null) {
          this.group = this.groupService.findById(idGroup);
          return;
        }        
      }
      
      this.navCtrl.navigateBack(['/', 'groups']);      
    });
  }

}
