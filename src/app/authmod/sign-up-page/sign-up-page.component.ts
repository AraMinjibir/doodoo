import { Component } from '@angular/core';
import {TuiAppearance, TuiButton, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule, TuiInputPasswordModule} from '@taiga-ui/legacy';
import {FormsModule} from '@angular/forms';
import {TuiDropdownMobile} from '@taiga-ui/addon-mobile';
import {TuiDropdown} from '@taiga-ui/core';
import { TuiDataListWrapper, TuiFilterByInputPipe} from '@taiga-ui/kit';
import {
    TuiComboBoxModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { RouterLink } from '@angular/router';

interface User {
  readonly url: string;
  
}

@Component({
  selector: 'sign-up',
  imports: [ TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiTextfield,
    ReactiveFormsModule, 
    TuiInputModule, TuiButton,
    FormsModule,
    TuiComboBoxModule,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownMobile,
    TuiFilterByInputPipe,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiTitle,
    TuiInputPasswordModule,
    RouterLink],

  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
  
})
export class SignUpPageComponent {
    protected readonly signForm = new FormGroup({
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
      this.signForm.reset()
    } 
}
