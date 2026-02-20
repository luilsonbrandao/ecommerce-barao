import { TestBed } from '@angular/core/testing';

import { RegistrofinanceiroService } from './registrofinanceiro.service';

describe('RegistrofinanceiroService', () => {
  let service: RegistrofinanceiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrofinanceiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
