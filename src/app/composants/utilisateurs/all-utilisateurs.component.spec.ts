import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUtilisateursComponent } from './all-utilisateurs.component';

describe('AllUtilisateursComponent', () => {
  let component: AllUtilisateursComponent;
  let fixture: ComponentFixture<AllUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllUtilisateursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
