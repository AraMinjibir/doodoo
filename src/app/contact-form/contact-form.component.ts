import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiInputModule, TuiTextareaModule } from '@taiga-ui/legacy';
import { Observable } from 'rxjs';

interface SupportInquiry {
  email: string;
  name: string;
  subject: string;
  message: string;
  response?: string;
  timestamp: any;
  respondedAt?: any;
  status: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, TuiButton, NgIf, TuiInputModule, TuiTextareaModule, 
    TuiAppearance, TuiCardLarge, DatePipe, NgFor, AsyncPipe
  ],
  providers: [DatePipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  inquiries$: Observable<SupportInquiry[]> | null = null;
  emailChecked = false;
  selectedTab: 'send' | 'check' = 'send';

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required)
  });

  checkResponseForm = new FormGroup({
    emailForCheck: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private firestore: Firestore) {}

  switchTab(tab: 'send' | 'check') {
    this.selectedTab = tab;
    this.emailChecked = false; 
    this.inquiries$ = null; 
  }

  fetchUserInquiries() {
    const email = this.checkResponseForm.get('emailForCheck')?.value;
    if (!email) return;

    this.emailChecked = true;

    const inquiryRef = collection(this.firestore, 'contact_inquiries');
    const q = query(inquiryRef, where('email', '==', email.toLowerCase()));

    this.inquiries$ = collectionData(q, { idField: 'id' }) as Observable<SupportInquiry[]>;

    this.inquiries$.subscribe((data) => {
      if (data.length === 0) {
        this.inquiries$ = null;
      }
    });
  }
  async onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
  
      const inquiriesCollection = collection(this.firestore, 'contact_inquiries');
  
      try {
        await addDoc(inquiriesCollection, {
          ...formData,
          status: 'Pending',
          timestamp: new Date()
        });
        alert('Inquiry submitted successfully!');
        this.contactForm.reset();
      } catch (error) {
        console.error('Error submitting inquiry:', error);
        alert('Failed to submit inquiry.');
      }
    }
  }
}


