import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeleteClientComponent } from './page-delete-client.component';

describe('PageDeleteClientComponent', () => {
  let component: PageDeleteClientComponent;
  let fixture: ComponentFixture<PageDeleteClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDeleteClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDeleteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
