import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { CoordinatesDto } from '@trends/data';
import { LeafletMouseEvent } from 'leaflet';
import { CustomPopupEvent } from '../custom-marker.model';

const CRACOW_COORDS = { lat: 50.049683, lng: 19.944544 };

@Component({
  selector: 'trends-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy, OnChanges {
  private map: L.Map;
  private markerGroup: L.LayerGroup;

  @ViewChild('map') private mapContainer: ElementRef<HTMLElement>;

  @Input() markers: L.Marker[] = [];

  @Output() mapClick: EventEmitter<CoordinatesDto> = new EventEmitter();
  @Output() popupOpen: EventEmitter<string> = new EventEmitter();
  @Output() popupClose: EventEmitter<void> = new EventEmitter();

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = new L.Map(this.mapContainer.nativeElement, { dragging: true });
    this.map.setView(CRACOW_COORDS, 13);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    );

    tiles.addTo(this.map);
    this.map.on('click', (e) => this.onClick(e as LeafletMouseEvent));
    this.map.on('popupopen', (e) => this.onPopupOpen(e as CustomPopupEvent));
    this.map.on('popupclose', () => this.onPopupClose());
  }

  ngOnChanges(changes: SimpleChanges): void {
    const prevMarkers = changes.markers.previousValue;
    const markers = changes.markers.currentValue;

    if (prevMarkers !== markers && this.markerGroup) {
      this.markerGroup.clearLayers();
    }

    if (this.map && markers) {
      this.markerGroup = new L.LayerGroup(markers);
      this.map.addLayer(this.markerGroup);
    }
  }

  onClick(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    this.mapClick.emit({ lat, lng });
  }

  onPopupOpen(e: CustomPopupEvent) {
    this.popupOpen.emit(e.popup.options.markerId);
  }

  onPopupClose() {
    this.popupClose.emit();
  }

  ngOnDestroy() {
    this.map.off();
  }
}
