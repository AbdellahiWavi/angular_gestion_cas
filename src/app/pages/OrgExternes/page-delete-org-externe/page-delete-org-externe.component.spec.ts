import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeleteOrgExterneComponent } from './page-delete-org-externe.component';

describe('PageDeleteOrgExterneComponent', () => {
  let component: PageDeleteOrgExterneComponent;
  let fixture: ComponentFixture<PageDeleteOrgExterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDeleteOrgExterneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDeleteOrgExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
