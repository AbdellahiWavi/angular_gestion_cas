import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddDegreeComponent } from './page-add-degree.component';

describe('PageAddDegreeComponent', () => {
  let component: PageAddDegreeComponent;
  let fixture: ComponentFixture<PageAddDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAddDegreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAddDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
