import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeleteTypesCasComponent } from './page-delete-types-cas.component';

describe('PageDeleteTypesCasComponent', () => {
  let component: PageDeleteTypesCasComponent;
  let fixture: ComponentFixture<PageDeleteTypesCasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDeleteTypesCasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDeleteTypesCasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
