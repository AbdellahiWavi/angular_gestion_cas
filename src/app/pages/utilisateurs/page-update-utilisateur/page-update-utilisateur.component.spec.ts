import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUpdateUtilisateurComponent } from './page-update-utilisateur.component';

describe('PageUpdateUtilisateurComponent', () => {
  let component: PageUpdateUtilisateurComponent;
  let fixture: ComponentFixture<PageUpdateUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageUpdateUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUpdateUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
