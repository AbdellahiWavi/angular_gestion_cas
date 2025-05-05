import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllTypesCasComponent } from './page-all-types-cas.component';

describe('PageAllTypesCasComponent', () => {
  let component: PageAllTypesCasComponent;
  let fixture: ComponentFixture<PageAllTypesCasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAllTypesCasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAllTypesCasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
