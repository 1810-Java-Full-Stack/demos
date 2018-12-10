import { TestBed } from '@angular/core/testing';

import { ServiceWorkerWatcherService } from './service-worker-watcher.service';

describe('ServiceWorkerWatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceWorkerWatcherService = TestBed.get(ServiceWorkerWatcherService);
    expect(service).toBeTruthy();
  });
});
