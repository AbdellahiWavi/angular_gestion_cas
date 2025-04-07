import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUtilisateurComponent } from './delete-utilisateur.component';

describe('DeleteUtilisateurComponent', () => {
  let component: DeleteUtilisateurComponent;
  let fixture: ComponentFixture<DeleteUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
