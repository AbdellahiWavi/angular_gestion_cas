import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSupprimerUtilisateurComponent } from './page-supprimer-utilisateur.component';

describe('PageSupprimerUtilisateurComponent', () => {
  let component: PageSupprimerUtilisateurComponent;
  let fixture: ComponentFixture<PageSupprimerUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageSupprimerUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSupprimerUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
