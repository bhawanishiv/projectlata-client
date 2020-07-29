import { TestBed } from '@angular/core/testing';

import { PinConfigurationService } from './pin-configuration.service';

describe('PinConfigurationService', () => {
  let service: PinConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
