import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [RouterOutlet, SidemenuComponent],
  templateUrl: './private.component.html',
  styleUrl: './private.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateComponent {

}
