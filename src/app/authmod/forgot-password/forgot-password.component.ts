import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TuiAppearance, TuiButton, TuiTextfield} from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

@Component({
  selector: 'forgot-password',
  imports: [TuiAppearance,
      TuiCardLarge,
      TuiHeader,
      ReactiveFormsModule,
      TuiInputModule,
      TuiTextfield,
      TuiTextfieldControllerModule, 
      TuiButton],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  protected readonly testForm = new FormGroup({
      testValue: new FormControl(),
      password: new FormControl(),
      rememberMe: new FormControl(false)      
  });
}
