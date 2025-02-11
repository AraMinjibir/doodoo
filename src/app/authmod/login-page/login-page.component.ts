import { Component, inject } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiHint, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiTitle } from '@taiga-ui/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { NgIf } from '@angular/common';
import { SnackBarComponent } from '../../Utility/snack-bar/snack-bar.component';
import { LoaderComponent } from '../../Utility/loader/loader.component';

@Component({
  selector: 'login-page',
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    ReactiveFormsModule,
    TuiHint,
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiInputPasswordModule,
    TuiTitle,
    TuiButton,
    RouterLink,
    NgIf,SnackBarComponent,
    LoaderComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  errorMessage: string | null = null;
  isLoading: boolean = false;

  protected readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false),
  });

  onFormSubmitting() {
    this.isLoading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        // ✅ Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(res));
  
        const formattedRole = res.role.toLowerCase().replace(/\s+/g, '-');
  
        // ✅ Redirect based on role
        this.router.navigate([`/app-layout/${formattedRole}`]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });
  }
  
  

  

}