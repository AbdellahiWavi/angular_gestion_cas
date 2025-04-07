import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSupprimerIncidentComponent } from './page-supprimer-incident.component';

describe('PageSupprimerIncidentComponent', () => {
  let component: PageSupprimerIncidentComponent;
  let fixture: ComponentFixture<PageSupprimerIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageSupprimerIncidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSupprimerIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
