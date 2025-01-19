import { Component } from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiHint, TuiTextfield} from '@taiga-ui/core';
import {TuiInputModule, TuiInputPasswordModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import type {TuiBooleanHandler} from '@taiga-ui/cdk';
import {TuiTitle} from '@taiga-ui/core';
import {TuiRadioList} from '@taiga-ui/kit';

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
    TuiButton],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  protected readonly testForm = new FormGroup({
    testValue: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(false)      
});


}
