import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TuiAppearance, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

@Component({
  selector: 'reset-password',
  imports: [TuiAppearance,
        TuiCardLarge,
        TuiHeader,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfield,
        TuiTextfieldControllerModule, 
        TuiButton],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  protected readonly testForm = new FormGroup({
        treset: new FormControl(),
             
    });
}
