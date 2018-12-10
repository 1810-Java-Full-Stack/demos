import { Component } from '@angular/core';
import { ServiceWorkerWatcherService } from './service-worker-watcher.service';
import { SwPush } from '@angular/service-worker';

/**
 * {"publicKey":"BNODufYXb4mgB0RJSHfgUkvzbHGYoY6B8zKBa3fhPuGMaIv4DMcpHo5FVHGp259dlh4axqB0mYafgG3M5Ql1k7c","privateKey":"BuhEfo2IKwQj3kvdwfaO0oSnKCsKSqtJAxG9w3pEFI4"}
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wow Quinn talks alot geez';
  differedInstall = null;

  readonly VAPID_PUBLIC_KEY = 'BNODufYXb4mgB0RJSHfgUkvzbHGYoY6B8zKBa3fhPuGMaIv4DMcpHo5FVHGp259dlh4axqB0mYafgG3M5Ql1k7c';

  constructor(public serviceWorkerWatcher: ServiceWorkerWatcherService, private swPush: SwPush) { 
    window.addEventListener('beforeinstallprompt', (event) => {
      this.differedInstall = event;
    });

    this.subscribeToNotifications();
  }

  installApp() {
    if (this.differedInstall) {
      this.differedInstall.prompt();
    }
  }

  async subscribeToNotifications() {
    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      });

      console.log(JSON.stringify(sub));

      // this.newsLetterService.addSubscription(sub);
    } catch (e) {
      console.error(`Could not register push notifications ${e}`);
    }
  }
}
