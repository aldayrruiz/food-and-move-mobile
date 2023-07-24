import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedbackEveningPage } from './feedback-evening.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackEveningPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackEveningPageRoutingModule {}
