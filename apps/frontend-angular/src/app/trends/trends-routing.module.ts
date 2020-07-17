import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendSearcherComponent } from './trend-searcher/trend-searcher.component';
import { PersonalHistoryComponent } from './personal-history/personal-history.component';

const routes: Routes = [
  {
    path: 'personal-history',
    redirectTo: 'personal-history/',
    pathMatch: 'full',
  },
  {
    path: 'personal-history/:id',
    component: PersonalHistoryComponent,
  },
  {
    path: '',
    component: TrendSearcherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrendsRoutingModule {}
