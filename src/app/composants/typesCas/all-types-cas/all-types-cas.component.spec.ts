import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTypesCasComponent } from './all-types-cas.component';

describe('AllTypesCasComponent', () => {
  let component: AllTypesCasComponent;
  let fixture: ComponentFixture<AllTypesCasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTypesCasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTypesCasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
