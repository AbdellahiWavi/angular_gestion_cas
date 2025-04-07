import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNonAffecteComponent } from './page-non-affecte.component';

describe('PageNonAffecteComponent', () => {
  let component: PageNonAffecteComponent;
  let fixture: ComponentFixture<PageNonAffecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNonAffecteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNonAffecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
