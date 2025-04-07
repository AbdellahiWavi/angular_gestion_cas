import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerIncidentComponent } from './supprimer-incident.component';

describe('SupprimerIncidentComponent', () => {
  let component: SupprimerIncidentComponent;
  let fixture: ComponentFixture<SupprimerIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupprimerIncidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
