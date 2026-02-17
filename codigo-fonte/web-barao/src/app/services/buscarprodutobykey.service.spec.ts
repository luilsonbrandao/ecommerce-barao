import { TestBed } from '@angular/core/testing';

import { BuscarprodutobykeyService } from './buscarprodutobykey.service';

describe('BuscarprodutobykeyService', () => {
  let service: BuscarprodutobykeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarprodutobykeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
