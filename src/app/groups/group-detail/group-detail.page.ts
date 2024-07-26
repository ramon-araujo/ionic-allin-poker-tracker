import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { map, take, tap } from 'rxjs';
import { Group } from 'src/app/shared/model/group.model';
import { Player } from 'src/app/shared/model/player.model';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.page.html',
  styleUrls: ['./group-detail.page.scss'],
})
export class GroupDetailPage implements OnInit {


  group: Group | undefined;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController) { }

  ngOnInit() {}
  
  ionViewWillEnter() {
    this.route.paramMap.subscribe(
      paramMap => {
        if (paramMap.has('idGroup')) {
          const idGroup = paramMap.get('idGroup');
          if (idGroup != null) {                                    
            this.group = this.groupService.findById(idGroup);
            return;
          }        
        }
        
        this.navCtrl.navigateForward(['/', 'groups']);
      });       
  }

  onSendInvitation(member: Player) {
    console.log(member);
  }

  async onPresentAlert() {
    const alert = await this.alertController.create({
      header: 'Sobre os convites',
      message: `
                Você pode enviar convites individuais selecionando o ícone 'enviar' para o usuário desejado.\n
                Alternativamente, é possível gerar um convite geral que pode ser enviado a todos os usuários do grupo.
                `,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  onFinishCreation() {
    this.navCtrl.navigateForward(['/', 'groups']);    
  }

}
