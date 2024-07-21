import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ErrorEnum } from 'src/app/shared/enums/error-enum';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss'],
})
export class NewUserFormComponent  implements OnInit {

  @Output() optionChanged = new EventEmitter<string>();

  areTermsAccepted = false;

  constructor(
    private userService: UserService,
    private alertController: AlertController,    
    private toastController: ToastController) { }

  ngOnInit() {}

  onSubmit(form: NgForm): void {    
    if (form.invalid) {
      return;
    }

    if (form.value.password !== form.value.passwordConfirmation) {
      this.showAlert('Dados incorretos', 'A senha e a confirmação de senha não conferem.')
      return;
    }

    this.userService
      .createUser(form.value.name, form.value.email, form.value.password)
      .subscribe({
        next: () => {        
          form.reset();
          this.showToastSuccess();
          this.optionChanged.emit('auth');
        }, 
        error: (err) => {                    
          const header = 'Não foi possível criar usuário';
          let message = '';

          if (err.message === ErrorEnum.USER_ALREADY_EXISTS) {
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
