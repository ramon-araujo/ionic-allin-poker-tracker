import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ErrorEnum } from 'src/app/shared/enums/error-enum';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss'],
})
export class NewUserFormComponent  implements OnInit {

  @Output() optionChanged = new EventEmitter<string>();

  areTermsAccepted = false;
  birthDate = '1980-01-01';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {}

  onSubmit(form: NgForm): void {        

    if (form.invalid) {
      return;
    }    

    if (!this.birthDate) {
      this.showAlert('Dados incorretos', 'Informe a data de nascimento.')
      return;
    }

    if (form.value.password !== form.value.passwordConfirmation) {
      this.showAlert('Dados incorretos', 'A senha e a confirmação de senha não conferem.')
      return;
    }    

    this.loadingCtrl.create({ message: 'Criando novo usuário...' })
      .then(loadingEl => {
        loadingEl.present();

        this.authService
          .createUser(form.value.name, form.value.email, form.value.password, new Date(this.birthDate))
          .subscribe({
            next: () => {   
              loadingEl.dismiss();       
              form.reset();
              this.showToastSuccess();
              this.optionChanged.emit('auth');
            }, 
            error: (err) => {
              console.log(err);
              loadingEl.dismiss();                          
              const header = 'Não foi possível criar usuário';
              let message = '';
    
              if (err.code === ErrorEnum.AUTH_EMAIL_ALREADY_IN_USE) {
                message = `
                Já existe uma conta ativa para este usuário.\n
                Caso deseje recuperar sua senha, selecione a opção 'Esqueci minha senha'.
                `;
              } else {
                message = `
                Ocorreu um erro em sua solicitação. Favor tentar novamente mais tarde.
                `;
              }
    
              this.showAlert(header, message);                       
            }        
          });      
      });
  }  

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  private async showToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Conta criada com sucesso. Você já pode realizar o login.',
      duration: 5000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}
