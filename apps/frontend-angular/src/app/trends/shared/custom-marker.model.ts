import * as L from 'leaflet';
import { CoordinatesDto} from '@trends/data';
import { Layer, PopupEvent, PopupOptions } from 'leaflet';

export interface ExtendedPopupOptions extends PopupOptions {
  markerId: string
}

export interface CustomPopupEvent extends PopupEvent {
  popup: CustomMapPopup
}

class CustomMapPopup extends L.Popup {
  options: ExtendedPopupOptions;

  constructor(options: ExtendedPopupOptions, source?: Layer) {
    super(options, source);
  }
}

export const customMarkerFactory = (coordinates:CoordinatesDto,content:string,options?:ExtendedPopupOptions) => {
  const marker = new L.Marker(coordinates);
  const popup = new CustomMapPopup(options).setContent(content);
  marker.bindPopup(popup).openPopup();
  return marker;
};
