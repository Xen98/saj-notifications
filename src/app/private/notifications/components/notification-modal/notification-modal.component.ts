import { CustomInputComponent } from '@/components';
import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notification, NotificationForm, NotificationType } from '@/private/notifications/models';



@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './notification-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationModalComponent implements OnInit {
  title = input.required<string>();
  typeModal = input.required<string>();
  currentNotification = input.required<Notification | undefined>();

  closeModal = output<boolean>();
  onAddNotification = output<Notification>();
  onUpdateNotification = output<Notification>();

  ngOnInit(): void {
    if (this.typeModal() === 'update' && this.currentNotification() !== undefined) {
      this.notificationForm.patchValue({
        message: this.currentNotification()!.message,
        company_id: this.currentNotification()!.company_id,
        country_id: this.currentNotification()!.country_id,
        system_id: this.currentNotification()!.system_id,
        duration: this.currentNotification()!.duration,
        type: this.currentNotification()!.type,
        color: this.currentNotification()!.color
      });
    }
  }

  onCloseModal() {
    this.closeModal.emit(true);
  }

  notificationForm = new FormGroup<NotificationForm>({
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    company_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    country_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    system_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    duration: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    type: new FormControl(NotificationType.Info, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    color: new FormControl('#000000', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  onSubmit() {
    if (!this.notificationForm.valid) {
      console.log('Formulario invalido')
      return;
    }

    console.log('Formulario enviado', this.typeModal());

    this.onCloseModal();

    const outputNotification: Notification = {
      message: this.notificationForm.get('message')!.value,
      company_id: this.notificationForm.get('company_id')!.value,
      country_id: this.notificationForm.get('country_id')!.value,
      system_id: this.notificationForm.get('system_id')!.value,
      duration: this.notificationForm.get('duration')!.value,
      type: this.notificationForm.get('type')!.value,
      color: this.notificationForm.get('color')!.value
    }

    if (this.typeModal() === 'update' && this.currentNotification() !== undefined) {
      outputNotification.id = this.currentNotification()!.id;

      this.onUpdateNotification.emit(outputNotification);
    }

    if (this.typeModal() === 'add') {
      this.onAddNotification.emit(outputNotification);
    }
  }

}
