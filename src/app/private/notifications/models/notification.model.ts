import { ServerResponse } from "@/models/server.model";
import { FormControl } from "@angular/forms";

export enum NotificationType {
  Info = 'Informativo',
  Error = 'Error',
  Success = 'Éxito',
  Warning = 'Precaución/Advertencia'
}

export enum NotificationStatus {
  Active = 'A',
  Deleted = 'B'
}

export interface Notification {
  id?: number;
  message: string;
  company_id: number;
  country_id: number;
  system_id: number;
  duration: number;
  type: NotificationType;
  color: string;
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
}
