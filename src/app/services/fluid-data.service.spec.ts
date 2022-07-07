import { TestBed } from '@angular/core/testing';

import { FluidDataService } from './fluid-data.service';

describe('FluidDataService', () => {
  let service: FluidDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FluidDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
