import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TuiAppearance, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { AuthService } from '../../Service/auth.service';

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
  authService: AuthService = inject(AuthService);

  protected readonly resetForm = new FormGroup({
    reset: new FormControl(),
             
    });

    onFormSubmitting(){
      const oobCode = this.resetForm.value.reset;
      const newPassword = '';

      this.authService.resetPassword(oobCode, newPassword).subscribe({
        next: ((res) => console.log()),
        error: ((err) => console.log(err))
      })
      this.resetForm.reset()
    }

    resendCode(){
      const email = '';
      const requestType = '';
      this.authService.forgotPassword(email, requestType).subscribe({
        next: ((res) => console.log(res)),
        error: ((err) => console.log(err))
      })
    }
}
