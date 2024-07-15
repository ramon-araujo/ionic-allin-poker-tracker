import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Player } from 'src/app/shared/model/player.model';
import { User } from 'src/app/shared/model/user.model';
import { GroupService } from 'src/app/shared/services/group.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.page.html',
  styleUrls: ['./new-group.page.scss'],
})
export class NewGroupPage implements OnInit {

  members: Player[] = [];
  user: User | undefined;
  newMember: string = '';

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private router: Router,    
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.user = this.userService.geLoggedUser();    
  }

  ionViewWillEnter() {    
    if (this.members.length == 0 && this.user) {
      this.members.push(new Player(this.user.name, this.user));
    }
  }

  public onSubmit(form: NgForm) {    
    if (!form.valid) {
      return;
    }    

    this.groupService.createNewGroup(form.value.name, form.value.description, '' , this.members)
    .subscribe((group) => {      
      this.router.navigate(['groups', 'group-detail', group.id]);
    });
  }

  public onAddMember() {
    if (this.members.some((item) => item.name === this.newMember)) {
      this.presentAlert('Não foi possível inserir usuário', 'Já existe um usuário com este nome.');
      return;
    }
    
    this.members.push(new Player(this.newMember, undefined));
    this.newMember = '';
  }

  public onRemoveMember(index: number) {    
    this.members.splice(index, 1);
  }

  async presentAlert(header: string, text: string) {
    const alert = await this.alertController.create({
      header: header,      
      message: text,
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
