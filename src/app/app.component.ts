import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { take, tap } from 'rxjs';
import { GroupService } from './shared/services/group.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router) {}


  ngOnInit(): void {
    this.loadingCtrl.create({message: 'Carregando os dados'}).then(loadingEl => {
      this.userService.autoLogin().subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.groupService.reloadGroups().subscribe(() => {
            this.router.navigateByUrl('/groups');
            loadingEl.dismiss();
          });
        } 
      });
      loadingEl.present();
    });
  }

  public onLogout(): void {
    this.loadingCtrl.create({message: 'Realizando logout'}).then(loadingEl => {
      loadingEl.present();  
      this.userService.logout().subscribe(() => {
        loadingEl.dismiss();
        this.router.navigateByUrl("/login");
      })
    }).catch(error => {
      console.log(error);
      this.showToastError('Erro ao realizar logout.');
    })
  }

  private async showToastError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
}
