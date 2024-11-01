import { Notification } from "@/private/notifications/models";

export interface Alert {
  notificationConfig: Notification,
  message: string,
  show: boolean
}
