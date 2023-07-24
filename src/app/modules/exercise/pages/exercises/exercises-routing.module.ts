import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExercisesPage } from './exercises.page';

const routes: Routes = [
  {
    path: '',
    component: ExercisesPage,
  },
  {
    path: 'exercise/:exerciseId',
    loadChildren: () => import('@modules/exercise/pages/exercise/exercise.module').then((m) => m.ExercisePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesPageRoutingModule {}
