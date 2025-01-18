import { Component } from '@angular/core';
import {TuiAppearance, TuiButton, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/legacy';
 

@Component({
  selector: 'sign-up',
  imports: [ TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiTextfield,
    ReactiveFormsModule, 
    TuiInputModule, TuiButton],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
  
})
export class SignUpPageComponent {
    protected readonly testForm = new FormGroup({
        testValue: new FormControl('mail@mail.ru'),
        password: new FormControl(),
        cpassword: new FormControl()
    });
}
