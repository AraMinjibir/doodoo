import { Component, inject } from '@angular/core';
import {TuiAppearance, TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
import { NgIf } from '@angular/common';


interface User {
  readonly url: string;
  
}

@Component({
  selector: 'sign-up',
  imports: [ 
    NgIf,
    TuiAppearance,
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
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        cpassword: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required])
    },
    { validators: this.passwordMatchValidator }
  );
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const cpassword = form.get('cpassword')?.value;

    if (password !== cpassword) {
      form.get('cpassword')?.setErrors({ mismatch: true });
    } else {
      form.get('cpassword')?.setErrors(null);
    }
    return null;
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
      const role = this.signForm.value.role;
    
      this.authService.signUp(email, password).subscribe({
        next: (res) => {
          console.log(res);

          // Store the user object 
          const user = { email, role }; 
          localStorage.setItem('user', JSON.stringify([email, role]));          
          const formattedRole = role.toLowerCase().replace(/\s+/g, '-');
    
          // Redirect user to the correct role page
          if (role) {
            this.router.navigate([`/app-layout/${formattedRole}`]); 
          } else {
            this.router.navigate(['/app-layout/home-page']);  
          }
        },
        error: (err) => console.log(err),
        
      });

      this.signForm.reset()
    }
    
     
}
