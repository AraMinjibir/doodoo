import { Component, Input } from '@angular/core';

@Component({
  selector: 'snack-bar',
  imports: [],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {
  @Input() errorMessage: string | null = null;
}
