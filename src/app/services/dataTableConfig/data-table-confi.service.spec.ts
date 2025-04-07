import { TestBed } from '@angular/core/testing';

import { DataTableConfiService } from './data-table-confi.service';

describe('DataTableConfiService', () => {
  let service: DataTableConfiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTableConfiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
