import { Component, Input } from '@angular/core';
import { TrendResponseDto } from '@trends/data';

@Component({
  selector: 'trends-trend-card',
  templateUrl: './trend-card.component.html',
  styleUrls: ['./trend-card.component.scss'],
})
export class TrendCardComponent {
  @Input() trend: TrendResponseDto;
}
