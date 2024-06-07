import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupPage } from './group.page';

const routes: Routes = [
  {
    path: '',
    component: GroupPage,
    children: [
      {
        path: 'ranking',
        loadChildren: () => import('./ranking/ranking.module').then( m => m.RankingPageModule)
      },       
      {
        path: 'tournament-results',
        loadChildren: () => import('./tournament-results/tournament-results.module').then( m => m.TournamentResultsPageModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupPageRoutingModule {}
