import { Component, inject } from '@angular/core';
import {TuiAppearance, TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule, TuiInputPasswordModule} from '@taiga-ui/legacy';
import {FormsModule} from '@angular/forms';
import {TuiDropdownMobile} from '@taiga-ui/addon-mobile';
import { TuiFilterByInputPipe} from '@taiga-ui/kit';
import {
    TuiComboBoxModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Service/auth.service';


interface User {
  readonly url: string;
  
}

@Component({
  selector: 'sign-up',
  imports: [ TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    ReactiveFormsModule, 
    TuiInputModule, TuiButton,
    FormsModule,
    TuiComboBoxModule,
    TuiDropdownMobile,
    TuiFilterByInputPipe,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiTitle,
    TuiInputPasswordModule,
    RouterLink,
  ],

  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
  
})
export class SignUpPageComponent {
    router: Router = inject(Router);
    authService: AuthService = inject(AuthService);

   signForm = new FormGroup({
        email: new FormControl('mail@mail.ru'),
        password: new FormControl(),
        cpassword: new FormControl(),
        role: new FormControl()
    });
    isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
    protected role = null; 
    protected readonly roles = [
      'Administrator',
      'Customer Support Agent',
      'Recipient',
      'Sender',
      'Service Provider'


    ]

    onFormSubmitting(){
      const email = this.signForm.value.email;
      const password = this.signForm.value.password;

      this.authService.signUp(email, password).subscribe({
        next: (res) => (console.log(res)),
        error: (err) => (console.log(err))
      })
      this.signForm.reset();
    } 
}
