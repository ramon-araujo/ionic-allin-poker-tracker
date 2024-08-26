import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ErrorEnum } from 'src/app/shared/enums/error-enum';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-authenticate-form',
  templateUrl: './authenticate-form.component.html',
  styleUrls: ['./authenticate-form.component.scss'],
})
export class AuthenticateFormComponent  implements OnInit {

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
    const email = form.value.email;
    const password = form.value.password;

    this.loadingCtrl.create({ message: 'Realizando login...' }).then(loadingEl => {
      loadingEl.present();

      this.authService.authenticateUserByLoginAndPasswd(email, password)      
      .subscribe({
        next: () => {   
          form.reset();          
          loadingEl.dismiss();
          this.router.navigate(['/', 'groups']);
        }, 
        error: (err) => {          
          loadingEl.dismiss();          
          if (err.code === ErrorEnum.AUTH_INVALID_CREDENTIAL) {
            this.showToastError('Usuário ou senha incorretos.')
          }
        }
      });                                    
    });
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
  
  onAuthenticateByFacebook() {
    //this.authenticate('', '');
  }
  
  onAuthenticateByGoogle() {
    //this.authenticate('', '');
  }  
}
