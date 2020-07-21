import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { By } from '@angular/platform-browser';
import { customMarkerFactory } from '../custom-marker.model';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickEvent after map is clicked', (done) => {
    component.mapClick.subscribe((val) => {
      expect(val).toEqual(expect.objectContaining({ lat: expect.any(Number), lng: expect.any(Number) }));
      done();
    });

    fixture.debugElement.query(By.css('#map')).nativeElement.click();
  });
});
