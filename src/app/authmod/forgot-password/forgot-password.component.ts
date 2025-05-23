import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAppearance, TuiButton, TuiTextfield} from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { AuthService } from '../../Service/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'forgot-password',
  imports: [TuiAppearance,
      TuiCardLarge,
      TuiHeader,
      ReactiveFormsModule,
      TuiInputModule,
      TuiTextfield,
      TuiTextfieldControllerModule, 
      TuiButton,
      NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  protected readonly forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
           
  });
  onFormSubmitting(){
    const email = this.forgotForm.value.email;
    const requestType = 'PASSWORD_RESET';

    this.authService.forgotPassword(email, requestType).subscribe({
      next: (res) => console.log('Password reset email sent:', res),
      error: ((err) => console.log(err))
    })
    this.forgotForm.reset();
   
    
  }
}
