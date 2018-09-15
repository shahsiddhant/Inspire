import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyScoreComponent } from './energy-score.component';

describe('EnergyScoreComponent', () => {
  let component: EnergyScoreComponent;
  let fixture: ComponentFixture<EnergyScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
