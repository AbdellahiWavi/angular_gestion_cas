import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrgExterneComponent } from './delete-org-externe.component';

describe('DeleteOrgExterneComponent', () => {
  let component: DeleteOrgExterneComponent;
  let fixture: ComponentFixture<DeleteOrgExterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteOrgExterneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOrgExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
