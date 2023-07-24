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
  {
    path: 'exercises',
    loadChildren: () => import('@modules/exercise/pages/exercises/exercises.module').then((m) => m.ExercisesPageModule),
  },
  {
    path: 'feedback-morning',
    loadChildren: () => import('@modules/feedback/pages/feedback-morning/feedback-morning.module').then((m) => m.FeedbackMorningPageModule),
  },
  {
    path: 'feedback-evening',
    loadChildren: () => import('@modules/feedback/pages/feedback-evening/feedback-evening.module').then((m) => m.FeedbackEveningPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersRoutingModule {}
