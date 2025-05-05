import { TestBed } from '@angular/core/testing';

import { TypeCasService } from './type-cas.service';

describe('TypeCasService', () => {
  let service: TypeCasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
