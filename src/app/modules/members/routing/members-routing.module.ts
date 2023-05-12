import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('@modules/home/pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'menu',
    loadChildren: () => import('@modules/food/pages/menu/menu.module').then((m) => m.MenuPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersRoutingModule {}
