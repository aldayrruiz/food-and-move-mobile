import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { RouterService } from '@core/services/router/router.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private routerService: RouterService) {}

  async ngOnInit() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Food&Move',
          body: '¿Cómo te has levantado hoy?',
          id: 1,
          schedule: {
            allowWhileIdle: true,
            on: {
              hour: 8,
              minute: 0,
            },
          },
        },
      ],
    });

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Food&Move',
          body: '¿Qué tal te ha ido el día?',
          id: 2,
          schedule: {
            allowWhileIdle: true,
            on: {
              hour: 20,
              minute: 0,
            },
          },
        },
      ],
    });

    await LocalNotifications.addListener('localNotificationActionPerformed', async (notification) => {
      if (notification.notification.id === 1) {
        await this.routerService.goToFeedbackMorning();
      }
      if (notification.notification.id === 2) {
        await this.routerService.goToFeedbackEvening();
      }
    });
  }
}
