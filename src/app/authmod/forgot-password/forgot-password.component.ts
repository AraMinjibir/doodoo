import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAppearance, TuiButton, TuiTextfield} from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { AuthService } from '../../Service/auth.service';

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
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  protected readonly forgotForm = new FormGroup({
      email: new FormControl(),
           
  });
  onFormSubmitting(){
    const email = this.forgotForm.value.email;
    const requestType = 'PASSWORD_RESET';

    this.authService.forgotPassword(email, requestType).subscribe({
      next: (res) => console.log('Password reset email sent:', res),
      error: ((err) => console.log(err))
    })
    this.forgotForm.reset();
    // this.router.navigate(['auth/reset-password']);
    
  }
}
