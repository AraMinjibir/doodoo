import { Component } from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiHint, TuiTextfield} from '@taiga-ui/core';
import {TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {TuiTitle} from '@taiga-ui/core';
import { RouterLink } from '@angular/router';


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
  protected readonly loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(false)      
});
onFormSubmitting(){
  this.loginForm.reset();
}

}
