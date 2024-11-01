import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInputComponent {
  control = input.required<AbstractControl<string, string> | null | AbstractControl<number, number>>();
  label = input.required<string>();
  id = input.required<string>();
  type = input.required<string>();
  placeholder = input.required<string>();
  errorMessage = input.required<string>();
}
