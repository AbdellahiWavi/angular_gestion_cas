import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddTypeCasComponent } from './page-add-type-cas.component';

describe('PageAddTypeCasComponent', () => {
  let component: PageAddTypeCasComponent;
  let fixture: ComponentFixture<PageAddTypeCasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAddTypeCasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAddTypeCasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
