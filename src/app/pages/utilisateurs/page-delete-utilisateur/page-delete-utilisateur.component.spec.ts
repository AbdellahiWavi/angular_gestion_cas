import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeleteUtilisateurComponent } from './page-delete-utilisateur.component';

describe('PageDeleteUtilisateurComponent', () => {
  let component: PageDeleteUtilisateurComponent;
  let fixture: ComponentFixture<PageDeleteUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDeleteUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDeleteUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
