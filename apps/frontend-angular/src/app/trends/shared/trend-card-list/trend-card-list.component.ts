import { Component, Input } from '@angular/core';
import { TrendResponseDto } from '@trends/data';

@Component({
  selector: 'trends-trend-card-list',
  templateUrl: './trend-card-list.component.html',
  styleUrls: ['./trend-card-list.component.scss'],
})
export class TrendCardListComponent {
  @Input() trends: TrendResponseDto[];
}
