import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllDegreeComponent } from './page-all-degree.component';

describe('PageAllDegreeComponent', () => {
  let component: PageAllDegreeComponent;
  let fixture: ComponentFixture<PageAllDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAllDegreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAllDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
