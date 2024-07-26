import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { alreadyAuthenticatedGuard } from './auth/already-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },    
  {
    path: 'login',
    canActivate: [alreadyAuthenticatedGuard],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  
  {
    path: 'groups',
    canActivate: [authGuard],
    loadChildren: () => import('./groups/groups.module').then( m => m.GroupsPageModule)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'new-tournament',
    canActivate: [authGuard],
    loadChildren: () => import('./tournaments/new-tournament/new-tournament.module').then( m => m.NewTournamentPageModule)
  },  
  {
    path: 'register-result',
    canActivate: [authGuard],
    loadChildren: () => import('./tournaments/register-result/register-result.module').then( m => m.RegisterResultPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
