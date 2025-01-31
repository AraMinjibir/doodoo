import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, TuiButton, NgIf],
  providers: [],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
protected readonly contactForm = new FormGroup({
      email: new FormControl(),
           
  });

  

  onSubmit(): void {
  }
}
