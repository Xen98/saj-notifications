import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { NotificationsService } from './services';
import { NotificationModalComponent, NotificationsListComponent } from './components';
import { Notification, NotificationType } from './models';
import { AlertContainerComponent } from '../components';
import { Alert } from '../components/alert-container/models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationsListComponent, NotificationModalComponent, AlertContainerComponent],
  templateUrl: './notifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {
  notificationService = inject(NotificationsService);

  notifications = computed(() => this.notificationService.state().notifications);

  showModal = signal(false);
  typeModal = signal('');
  currentNotification = signal<Notification | undefined>(undefined);

  alertNotification: Alert = {
    notificationConfig: {
      id: 0,
      message: '',
      company_id: 0,
      country_id: 0,
      system_id: 0,
      duration: 0,
      type: NotificationType.Info,
      color: ''
    },
    message: '',
    show: false
  };

  constructor() {
    this.notificationService.getNotifications();
  }

  openNewNotificationModal() {
    this.typeModal.set('add');
    this.showModal.set(true);
  }

  openUpdateNotificationModal(id: number) {
    console.log('Notificación a actualizar', id);
    this.typeModal.set('update');
    this.currentNotification.set(this.notificationService.getNotificationById(id));
    this.showModal.set(true);
  }

  closeNewNotificationModal() {
    this.showModal.set(false);
  }

  addNotification(notification: Notification) {
    console.log('Notificación guardada', notification);
    this.notificationService.addNotification(notification);

    this.alertNotification = {
      notificationConfig: { ...notification },
      message: 'Registro exitoso',
      show: true
    };
  }

  updateNotification(notification: Notification) {
    console.log('Notificación actualizada', notification);
    this.notificationService.updateNotification(notification);

    this.alertNotification = {
      notificationConfig: { ...notification },
      message: 'Actualización exitosa',
      show: true
    }
  }

  deleteNotification(id: number) {
    console.log('Notificación eliminada', id);
    this.notificationService.deleteNotification(id);

    const deletedNotification = this.notifications().find(n => n.id === id)!;

    this.alertNotification = {
      notificationConfig: { ...deletedNotification },
      message: 'Eliminación exitosa',
      show: true
    }
  }
}
