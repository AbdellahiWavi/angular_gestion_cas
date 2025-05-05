import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentAffecteOrgExtComponent } from './incident-affecte-org-ext.component';

describe('IncidentAffecteOrgExtComponent', () => {
  let component: IncidentAffecteOrgExtComponent;
  let fixture: ComponentFixture<IncidentAffecteOrgExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentAffecteOrgExtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentAffecteOrgExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
