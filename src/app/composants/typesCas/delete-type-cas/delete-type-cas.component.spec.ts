import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTypeCasComponent } from './delete-type-cas.component';

describe('DeleteTypeCasComponent', () => {
  let component: DeleteTypeCasComponent;
  let fixture: ComponentFixture<DeleteTypeCasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTypeCasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTypeCasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
