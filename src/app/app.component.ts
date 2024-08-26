import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router) {}


  ngOnInit(): void {
    this.authService.autoLogin().subscribe({
      next: () => {                        
        const user = this.userService.getLoggedUser();
        if (user) {
          this.router.navigateByUrl('/groups');
        }                
        SplashScreen.hide();
      },
      error: error => {
        console.log(error);
        SplashScreen.hide();
        this.showToastError(`Erro ao carregar dados de ${this.userService.getLoggedUser()?.name}.`);
      }
    });
  }

  public onLogout(): void {
    this.loadingCtrl.create({message: 'Realizando logout'}).then(loadingEl => {
      loadingEl.present();  
      this.authService.logout().subscribe(() => {
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
