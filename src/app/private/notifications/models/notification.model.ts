import { ServerResponse } from "@/models/server.model";
import { FormControl } from "@angular/forms";

export enum NotificationType {
  Info = 'Informativo',
  Error = 'Error',
  Success = 'Éxito',
  Warning = 'Precaución/Advertencia'
}

export enum NotificationDefaultColors {
  Info = '#3584e4',
  Error = '#e01b24',
  Success = '#33d17a',
  Warning = '#f6d32d'
}

export enum NotificationStatus {
  Active = 'A',
  Deleted = 'B'
}

export interface Notification {
  id?: number;
  message: string;
  company_id: number;
  company?: string;
  country_id: number;
  country?: string;
  system_id: number;
  system?: string;
  duration: number;
  type: NotificationType;
  color: string;
  button: number;
  status?: NotificationStatus;
  created_at?: string;
  updated_at?: string;
}

export interface NotificationsResponse extends ServerResponse {
  data: Notification[];
}

export interface NotificationResponse extends ServerResponse {
  data: Notification;
}

export interface NotificationForm {
  message: FormControl<string>;
  company_id: FormControl<number>;
  country_id: FormControl<number>;
  system_id: FormControl<number>;
  duration: FormControl<number>;
  type: FormControl<NotificationType>;
  color: FormControl<string>;
  button: FormControl<number>;
}
