import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiTextareaModule} from '@taiga-ui/legacy';

@Component({
  selector: 'customer',
  imports: [TuiButton, TuiCardLarge,TuiAppearance, NgIf, NgFor,ReactiveFormsModule, TuiTextareaModule],
  templateUrl: './customer-support.component.html',
  styleUrl: './customer-support.component.scss'
})
export class CustomerSupportComponent {

  showCard: boolean = false;
  showResponseCard: boolean = false;

  inquiries = [
    {
      id: 1,
      name: 'AraMjb',
      email: 'aramjb@example.com',
      inquiry: 'I need help with my subscription.',
    },
    {
      id: 2,
      name: 'Abubakar',
      email: 'abubakar@example.com',
      inquiry: 'Can you assist me with my account settings?',
    },
    {
      id: 2,
      name: 'Abubakar',
      email: 'abubakar@example.com',
      inquiry: 'Can you assist me with my account settings?',
    },
    {
      id: 2,
      name: 'Abubakar',
      email: 'abubakar@example.com',
      inquiry: 'Can you assist me with my account settings?',
    },
    {
      id: 2,
      name: 'Abubakar',
      email: 'abubakar@example.com',
      inquiry: 'Can you assist me with my account settings?',
    },
  ];
  protected responseForm = new FormGroup({
    testValue3: new FormControl(Validators.required),
});
  respondToInquiry(){
    this.showCard = false;
    this.showResponseCard = true;
  }
  onshowCard(){
    this.showCard = true;
  }
  sendResponse(){
    this.showResponseCard = false;
  }
}
