import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

import { Notification, NotificationsResponse } from '@/private/notifications/models';
import { ServerResponse } from '@/models/server.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  http = inject(HttpClient);

  state = signal({
    notifications: [] as Notification[],
  });

  private readonly baseUrl = 'http://localhost/saj_notifications_back';

  getNotifications() {
    this.http.get<NotificationsResponse>(`${this.baseUrl}/notifications`).pipe(
      catchError(error => {
        console.error(error)

        return of(
          {
            message: error,
            data: []
          } as NotificationsResponse
        )
      })
    ).subscribe(resp => {
      this.state.set({
        notifications: resp.data
      })
    })
  }

  getNotificationById(id: number): Notification | undefined {
    return this.state().notifications.find(n => n.id === id);
  }

  addNotification(notification: Notification) {
    this.http.post<ServerResponse>(`${this.baseUrl}/notification`, notification).pipe(
      catchError(error => {
        console.error(error)

        return of({
          message: error
        } as ServerResponse)
      })
    ).subscribe(() => {
      this.state.update(state => {
        return {
          notifications: state.notifications.concat(notification)
        }
      })
    })
  }

  updateNotification(notification: Notification) {
    this.http.put<ServerResponse>(`${this.baseUrl}/notification`, notification).pipe(
      catchError(error => {
        console.error(error)

        return of({
          message: error
        } as ServerResponse)
      })
    ).subscribe(() => {
      this.state.update(state => {
        return {
          notifications: state.notifications.map(n => n.id === notification.id ? notification : n)
        }
      })
    })
  }

  deleteNotification(id: number) {
    this.http.delete<ServerResponse>(`${this.baseUrl}/notification`, { body: { id } }).pipe(
      catchError(error => {
        console.error(error)

        return of({
          message: error
        } as ServerResponse)
      })
    ).subscribe(() => {
      this.state.update(state => {
        return {
          notifications: state.notifications.filter(n => n.id !== id)
        }
      })
    })
  }
}
