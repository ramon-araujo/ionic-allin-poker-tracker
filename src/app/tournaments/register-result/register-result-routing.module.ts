import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterResultPage } from './register-result.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterResultPageRoutingModule {}
