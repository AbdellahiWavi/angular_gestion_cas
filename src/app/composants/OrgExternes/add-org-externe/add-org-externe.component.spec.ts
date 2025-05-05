import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgExterneComponent } from './add-org-externe.component';

describe('AddOrgExterneComponent', () => {
  let component: AddOrgExterneComponent;
  let fixture: ComponentFixture<AddOrgExterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrgExterneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrgExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
