import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAffecteComponent } from './non-affecte.component';

describe('NonAffecteComponent', () => {
  let component: NonAffecteComponent;
  let fixture: ComponentFixture<NonAffecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NonAffecteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAffecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
