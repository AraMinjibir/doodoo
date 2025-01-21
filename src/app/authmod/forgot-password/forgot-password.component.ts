import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  router: Router = inject(Router)
  protected readonly forgotForm = new FormGroup({
      email: new FormControl(),
           
  });
  onFormSubmitting(){
    this.forgotForm.reset();
    this.router.navigate(['auth/reset-password']);
    
  }
}
