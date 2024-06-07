import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentResultsPage } from './tournament-results.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentResultsPageRoutingModule {}
