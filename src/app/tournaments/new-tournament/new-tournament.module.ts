import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTournamentPageRoutingModule } from './new-tournament-routing.module';

import { NewTournamentPage } from './new-tournament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTournamentPageRoutingModule
  ],
  declarations: [NewTournamentPage]
})
export class NewTournamentPageModule {}
