import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanGoToLoginGuard } from '@core/guards/can-go-to-login.guard';
import { CanGoToMembers } from '@core/guards/can-go-to-members';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('@modules/auth/pages/login/login.module').then((m) => m.LoginPageModule),
    canLoad: [CanGoToLoginGuard],
  },
  {
    path: 'members',
    loadChildren: () => import('@modules/members/routing/members.module').then((m) => m.MembersModule),
    canLoad: [CanGoToMembers],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
