import { TestBed } from '@angular/core/testing';

import { LuckynamesService } from './luckynames.service';

describe('LuckynamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LuckynamesService = TestBed.get(LuckynamesService);
    expect(service).toBeTruthy();
  });
});
