import { ChangeDetectionStrategy, Component, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { NotificationMessageComponent } from './components';
import { Alert } from './models';

@Component({
  selector: 'app-alert-container',
  standalone: true,
  imports: [NotificationMessageComponent],
  templateUrl: './alert-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertContainerComponent implements OnChanges {
  notification = input.required<Alert>();

  onCloseNotification = output<boolean>();

  displayNotificationMessage = signal<boolean>(false);

  notificationTime: number = 0;

  timeoutRef: ReturnType<typeof setTimeout> | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notification']) {
      this.notificationTime = this.notification().notificationConfig.duration || 0;
      this.displayNotificationMessage.set(this.notification().show);

      console.log('Duracion alerta: ', this.notificationTime)

      if (this.timeoutRef) {
        clearTimeout(this.timeoutRef);
      }

      if (this.notificationTime > 0) {
        this.timeoutRef = setTimeout(() => {
          console.log('Cierra alerta')
          this.displayNotificationMessage.set(false);
        }, this.notificationTime * 1000);
      }
    }
  }
}
