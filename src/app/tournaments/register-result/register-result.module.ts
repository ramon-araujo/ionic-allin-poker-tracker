import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterResultPageRoutingModule } from './register-result-routing.module';

import { RegisterResultPage } from './register-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterResultPageRoutingModule
  ],
  declarations: [RegisterResultPage]
})
export class RegisterResultPageModule {}
