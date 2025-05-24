import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllUtilisateursComponent } from './page-all-utilisateurs.component';

describe('PageAllUtilisateursComponent', () => {
  let component: PageAllUtilisateursComponent;
  let fixture: ComponentFixture<PageAllUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAllUtilisateursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAllUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
