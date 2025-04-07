import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUpdateIncidentComponent } from './page-update-incident.component';

describe('PageUpdateIncidentComponent', () => {
  let component: PageUpdateIncidentComponent;
  let fixture: ComponentFixture<PageUpdateIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageUpdateIncidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUpdateIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
