import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUpdateRoleComponent } from './page-update-role.component';

describe('PageUpdateRoleComponent', () => {
  let component: PageUpdateRoleComponent;
  let fixture: ComponentFixture<PageUpdateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageUpdateRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUpdateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
