import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentResultsPageRoutingModule } from './tournament-results-routing.module';

import { TournamentResultsPage } from './tournament-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentResultsPageRoutingModule
  ],
  declarations: [TournamentResultsPage]
})
export class TournamentResultsPageModule {}
