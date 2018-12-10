import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class ServiceWorkerWatcherService {

  updateIsReady = false;

  constructor(updates: SwUpdate) {
    console.log('here');

    updates.available.subscribe(
      () => this.updateIsReady = true
    );
   }
}
