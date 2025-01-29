import { Component, inject } from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiHint, TuiTextfield} from '@taiga-ui/core';
import {TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {TuiTitle} from '@taiga-ui/core';
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
    RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService)

  protected readonly loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(false)      
});
onFormSubmitting(){
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;

  this.authService.login(email, password).subscribe({
    next: (res) => (console.log(res)),
    error: (err) => (console.log(err))
  })
  this.loginForm.reset();
}

}
