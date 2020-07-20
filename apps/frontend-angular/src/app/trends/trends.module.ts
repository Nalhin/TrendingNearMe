import { NgModule } from '@angular/core';

import { TrendsRoutingModule } from './trends-routing.module';
import { MapComponent } from './shared/map/map.component';
import { PersonalHistoryComponent } from './personal-history/personal-history.component';
import { TrendSearcherComponent } from './trend-searcher/trend-searcher.component';
import { TrendCardComponent } from './shared/trend-card/trend-card.component';
import { TrendCardListComponent } from './shared/trend-card-list/trend-card-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MapComponent,
    PersonalHistoryComponent,
    TrendSearcherComponent,
    TrendCardComponent,
    TrendCardListComponent,
  ],
  imports: [SharedModule, TrendsRoutingModule],
})
export class TrendsModule {}
