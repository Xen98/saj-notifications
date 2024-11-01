import { Component, input, output } from '@angular/core';

import { NotificationDetailComponent } from './components';
import { Notification } from '@/private/notifications/models';

@Component({
  selector: 'app-notifications-list',
  standalone: true,
  imports: [NotificationDetailComponent],
  templateUrl: './notifications-list.component.html',
  styleUrl: './notifications-list.component.css'
})
export class NotificationsListComponent {
  notifications = input.required<Notification[]>();

  onUpdateNotification = output<number>();
  onDeleteNotification = output<number>();

  emitUpdateNotification(id: number) {
    this.onUpdateNotification.emit(id);
  }

  emitDeleteNotification(id: number) {
    this.onDeleteNotification.emit(id);
  }
}
