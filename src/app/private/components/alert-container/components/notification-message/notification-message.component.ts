import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Alert } from '../../models';

@Component({
  selector: 'app-notification-message',
  standalone: true,
  imports: [],
  templateUrl: './notification-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationMessageComponent {
  notification = input.required<Alert>();
}
