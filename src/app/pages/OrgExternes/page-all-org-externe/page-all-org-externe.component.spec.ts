import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllOrgExterneComponent } from './page-all-org-externe.component';

describe('PageAllOrgExterneComponent', () => {
  let component: PageAllOrgExterneComponent;
  let fixture: ComponentFixture<PageAllOrgExterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAllOrgExterneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAllOrgExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
