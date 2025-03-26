import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllIncidentsComponent } from './page-all-incidents.component';

describe('IncidentsComponent', () => {
  let component: PageAllIncidentsComponent;
  let fixture: ComponentFixture<PageAllIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAllIncidentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAllIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
