import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDegreeComponent } from './all-degree.component';

describe('AllDegreeComponent', () => {
  let component: AllDegreeComponent;
  let fixture: ComponentFixture<AllDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllDegreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
