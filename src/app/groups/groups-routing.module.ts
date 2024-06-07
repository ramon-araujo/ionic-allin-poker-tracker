import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsPage } from './groups.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage
  },
  {
    path: 'new-group',
    loadChildren: () => import('./new-group/new-group.module').then( m => m.NewGroupPageModule)
  },
  {
    path: 'edit-group',
    loadChildren: () => import('./edit-group/edit-group.module').then( m => m.EditGroupPageModule)
  },
  {
    path: 'group/:idGroup',
    loadChildren: () => import('./group/group.module').then( m => m.GroupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
