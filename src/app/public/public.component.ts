import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './public.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicComponent {

}
