import { TestBed } from '@angular/core/testing';

import { BuscarcepService } from './buscarcep.service';

describe('BuscarcepService', () => {
  let service: BuscarcepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarcepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
