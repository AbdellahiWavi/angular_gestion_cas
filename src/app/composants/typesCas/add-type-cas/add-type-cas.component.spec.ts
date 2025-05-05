import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeCasComponent } from './add-type-cas.component';

describe('AddTypeCasComponent', () => {
  let component: AddTypeCasComponent;
  let fixture: ComponentFixture<AddTypeCasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTypeCasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeCasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
