import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSignUpAdminComponent } from './page-sign-up-admin.component';

describe('PageSignUpAdminComponent', () => {
  let component: PageSignUpAdminComponent;
  let fixture: ComponentFixture<PageSignUpAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageSignUpAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSignUpAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
