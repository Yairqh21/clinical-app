import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowToGetHerePage } from './how-to-get-here.page';

describe('HowToGetHerePage', () => {
  let component: HowToGetHerePage;
  let fixture: ComponentFixture<HowToGetHerePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToGetHerePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
