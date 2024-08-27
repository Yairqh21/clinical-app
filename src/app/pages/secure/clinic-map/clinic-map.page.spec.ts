import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClinicMapPage } from './clinic-map.page';

describe('ClinicMapPage', () => {
  let component: ClinicMapPage;
  let fixture: ComponentFixture<ClinicMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
