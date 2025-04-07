import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeleteRoleComponent } from './page-delete-role.component';

describe('PageDeleteRoleComponent', () => {
  let component: PageDeleteRoleComponent;
  let fixture: ComponentFixture<PageDeleteRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDeleteRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDeleteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
