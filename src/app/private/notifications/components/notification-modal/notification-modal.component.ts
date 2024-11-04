import { CustomInputComponent, CustomSelectComponent } from '@/components';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notification, NotificationDefaultColors, NotificationForm, NotificationType } from '@/private/notifications/models';

import { CountriesService } from '@/private/countries/services';
import { CountryOptionAdapter } from '@/private/countries/adapters/country.adapter';
import { CompaniesService } from '@/private/companies/services';
import { CompanyOptionAdapter } from '@/private/companies/adapters/company-adapter';
import { SystemsService } from '@/private/systems/services';
import { SystemOptionAdapter } from '@/private/systems/adapters/system.adapter';
import { count } from 'rxjs';



@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent, CustomSelectComponent],
  templateUrl: './notification-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationModalComponent implements OnInit {
  title = input.required<string>();
  typeModal = input.required<string>();
  currentNotification = input.required<Notification | undefined>();

  countriesService = inject(CountriesService);
  countries = computed(() => [
    { id: 0, label: 'Selecciona un país', value: 0, default: true },
    ...this.countriesService.state().countries.map(CountryOptionAdapter)
  ]);

  companiesService = inject(CompaniesService);
  companies = computed(() => [
    { id: 0, label: 'Selecciona una empresa', value: 0, default: true },
    ...this.companiesService.state().companies.map(CompanyOptionAdapter)
  ])

  systemsService = inject(SystemsService);
  systems = computed(() => [
    { id: 0, label: 'Selecciona un sistema', value: 0, default: true },
    ...this.systemsService.state().systems.map(SystemOptionAdapter)
  ])

  closeModal = output<boolean>();
  onAddNotification = output<Notification>();
  onUpdateNotification = output<Notification>();

  constructor() {
    this.countriesService.getCountries();
    this.companiesService.getCompanies();
    this.systemsService.getSystems();

    this.notificationForm.get('type')?.valueChanges.subscribe(value => {
      if (value === NotificationType.Warning && this.notificationForm.get('type')?.dirty) {
        this.notificationForm.get('color')?.setValue(NotificationDefaultColors.Warning);
        this.notificationForm.get('duration')?.setValue(0);
        this.notificationForm.get('button')?.setValue(1);
      }

      if (value === NotificationType.Error && this.notificationForm.get('type')?.dirty) {
        this.notificationForm.get('color')?.setValue(NotificationDefaultColors.Error);
        this.notificationForm.get('duration')?.setValue(0);
        this.notificationForm.get('button')?.setValue(1);
      }

      if (value === NotificationType.Success && this.notificationForm.get('type')?.dirty) {
        this.notificationForm.get('color')?.setValue(NotificationDefaultColors.Success);
        this.notificationForm.get('duration')?.setValue(15);
        this.notificationForm.get('button')?.setValue(0);
      }

      if (value === NotificationType.Info && this.notificationForm.get('type')?.dirty) {
        this.notificationForm.get('color')?.setValue(NotificationDefaultColors.Info);
        this.notificationForm.get('duration')?.setValue(15);
        this.notificationForm.get('button')?.setValue(0);
      }
    })
  }

  ngOnInit(): void {
    if (this.typeModal() === 'update' && this.currentNotification() !== undefined) {
      this.notificationForm.patchValue({
        message: this.currentNotification()!.message,
        company_id: this.currentNotification()!.company_id,
        country_id: this.currentNotification()!.country_id,
        system_id: this.currentNotification()!.system_id,
        duration: this.currentNotification()!.duration,
        type: this.currentNotification()!.type,
        color: this.currentNotification()!.color,
        button: this.currentNotification()!.button
      });
    }
  }

  onCloseModal() {
    this.closeModal.emit(true);
  }

  notificationForm = new FormGroup<NotificationForm>({
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
    }),
    company_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    country_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    system_id: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    duration: new FormControl(15, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    type: new FormControl(NotificationType.Success, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    color: new FormControl(NotificationDefaultColors.Success, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    button: new FormControl(0, {
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

    const companyId: number = this.notificationForm.getRawValue().company_id;
    const company = this.companies().find(company => company.value == companyId);
    const country = this.countries().find(country => country.value == this.notificationForm.getRawValue().country_id);
    const system = this.systems().find(system => system.value == this.notificationForm.getRawValue().system_id);

    const outputNotification: Notification = {
      message: this.notificationForm.get('message')!.value,
      company_id: this.notificationForm.get('company_id')!.value,
      company: company?.label,
      country_id: this.notificationForm.get('country_id')!.value,
      country: country?.label,
      system_id: this.notificationForm.get('system_id')!.value,
      system: system?.label,
      duration: this.notificationForm.get('duration')!.value,
      type: this.notificationForm.get('type')!.value,
      color: this.notificationForm.get('color')!.value,
      button: this.notificationForm.get('button')!.value
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
