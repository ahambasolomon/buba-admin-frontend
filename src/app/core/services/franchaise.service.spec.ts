import { TestBed } from '@angular/core/testing';

import { FranchaiseService } from './franchaise.service';

describe('FranchaiseService', () => {
  let service: FranchaiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FranchaiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
