import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedbackMorningPage } from './feedback-morning.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackMorningPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackMorningPageRoutingModule {}
