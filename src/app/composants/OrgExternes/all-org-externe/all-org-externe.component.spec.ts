import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrgExterneComponent } from './all-org-externe.component';

describe('AllOrgExterneComponent', () => {
  let component: AllOrgExterneComponent;
  let fixture: ComponentFixture<AllOrgExterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllOrgExterneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrgExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
