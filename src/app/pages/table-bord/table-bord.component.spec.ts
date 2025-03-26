import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBordComponent } from './table-bord.component';

describe('TableBordComponent', () => {
  let component: TableBordComponent;
  let fixture: ComponentFixture<TableBordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
