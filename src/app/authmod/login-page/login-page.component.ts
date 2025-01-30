import { Component, inject } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiHint, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiTitle } from '@taiga-ui/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

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
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  protected readonly loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(false),
  });

  onFormSubmitting() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log(res);

        // Fetch the stored user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user') || '[]');
        const storedEmail = userData[0];
        const storedRole = userData[1];

        // Validate the email and role
        if (email === storedEmail) {
          // Store the role in localStorage or a service for later use
          localStorage.setItem('currentRole', storedRole);

          // Redirect based on the role
          this.redirectBasedOnRole(storedRole);
        } else {
          console.error('User role mismatch');
          this.router.navigate(['app-layout/home-page']); // Redirect to home if the role doesn't match
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.router.navigate(['app-layout/home-page']); // Redirect to home on error
      },
    });

    this.loginForm.reset();
  }

  private redirectBasedOnRole(role: string) {
    switch (role) {
      case 'Administrator':
        this.router.navigate(['app-layout/administrator']);
        break;
      case 'Customer Support Agent':
        this.router.navigate(['app-layout/customer-support-agent']);
        break;
      case 'Recipient':
        this.router.navigate(['app-layout/recipient']);
        break;
      case 'Sender':
        this.router.navigate(['app-layout/sender']);
        break;
      case 'Service Provider':
        this.router.navigate(['app-layout/service-provider']);
        break;
      default:
        this.router.navigate(['app-layout/home-page']); // Redirect to home if the role is invalid
        break;
    }
  }
}