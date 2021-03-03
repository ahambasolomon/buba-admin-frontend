import { TestBed } from '@angular/core/testing';

import { MainInterceptorService } from './main-interceptor.service';

describe('MainInterceptorService', () => {
  let service: MainInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
