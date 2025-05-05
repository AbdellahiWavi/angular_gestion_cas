import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddOrgExterneComponent } from './page-add-org-externe.component';

describe('PageAddOrgExterneComponent', () => {
  let component: PageAddOrgExterneComponent;
  let fixture: ComponentFixture<PageAddOrgExterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAddOrgExterneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAddOrgExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
