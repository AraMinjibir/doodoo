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
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  protected readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false),
  });

  onFormSubmitting() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password, rememberMe } = this.loginForm.value;

    // Save credentials to localStorage if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email || '');
      localStorage.setItem('rememberedPassword', password || '');
    } else {
      // Clear saved credentials if "Remember Me" is unchecked
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }
    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log("Login Response:", res);
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
          
        if (storedUser) {
          // Extract role
          const extractedRole = storedUser?.role || null;
      
          if (extractedRole) {
            this.redirectBasedOnRole(extractedRole); 
          } else {
            this.router.navigate(['app-layout/home-page']);
            console.log("User role mismatch");
          }
        } else {
          this.router.navigate(['app-layout/home-page']);
          console.log("No user found");
        }
      },
      error: (err) => console.log("Login Error:", err)
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