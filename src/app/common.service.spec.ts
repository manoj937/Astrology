import { TestBed } from '@angular/core/testing';

import { commonService } from './common.service';

describe('LuckynamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: commonService = TestBed.get(commonService);
    expect(service).toBeTruthy();
  });
});
