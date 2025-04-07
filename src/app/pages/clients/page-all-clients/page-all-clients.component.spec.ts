import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllClientsComponent } from './page-all-clients.component';

describe('PageAllClientsComponent', () => {
  let component: PageAllClientsComponent;
  let fixture: ComponentFixture<PageAllClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAllClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAllClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
