import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPageComponent } from './notifications.component';

describe('NotificationsPageComponent', () => {
  let component: NotificationsPageComponent;
  let fixture: ComponentFixture<NotificationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotificationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});