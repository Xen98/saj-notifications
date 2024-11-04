import { Option } from '@/models';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectComponent {
  control = input.required<AbstractControl<string, string> | null | AbstractControl<number, number>>();
  label = input.required<string>();
  id = input.required<string>();
  options = input.required<Option[]>();
  errorMessage = input.required<string>();
}
