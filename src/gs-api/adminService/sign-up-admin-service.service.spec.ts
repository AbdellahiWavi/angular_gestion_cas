import { TestBed } from '@angular/core/testing';

import { SignUpAdminServiceService } from './sign-up-admin-service.service';

describe('SignUpAdminServiceService', () => {
  let service: SignUpAdminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpAdminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
