import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddRoleComponent } from './page-add-role.component';

describe('PageAddRoleComponent', () => {
  let component: PageAddRoleComponent;
  let fixture: ComponentFixture<PageAddRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAddRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
