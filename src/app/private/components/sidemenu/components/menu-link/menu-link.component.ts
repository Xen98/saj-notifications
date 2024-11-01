import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-link',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuLinkComponent {
  url = input.required<string>();
  text = input.required<string>();
}
