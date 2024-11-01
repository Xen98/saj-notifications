import { Component, input, output } from '@angular/core';

import { Notification } from '@/private/notifications/models';

@Component({
  selector: 'app-notification-detail',
  standalone: true,
  imports: [],
  templateUrl: './notification-detail.component.html',
  styleUrl: './notification-detail.component.css'
})
export class NotificationDetailComponent {
  notification = input.required<Notification>()
  index = input.required<number>()

  onUpdateNotification = output<number>();
  onDeleteNotification = output<number>();

  emitUpdateNotification(id: number | undefined) {
    if (id) {
      this.onUpdateNotification.emit(id);
    }
  }

  emitDeleteNotification(id: number | undefined) {
    if (id) {
      this.onDeleteNotification.emit(id);
    }
  }
}
