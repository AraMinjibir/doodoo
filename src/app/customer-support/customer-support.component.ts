import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TuiAppearance, TuiButton, TuiDialogService } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiInputModule, TuiTextareaModule} from '@taiga-ui/legacy';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, getDoc, serverTimestamp, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'customer',
  imports: [TuiButton, TuiCardLarge,TuiAppearance, NgIf, NgFor,
    ReactiveFormsModule, TuiTextareaModule, FormsModule, DatePipe, NgFor, AsyncPipe, 
  TuiButton, TuiInputModule, TuiTextareaModule, TuiAppearance,TuiCardLarge],
  templateUrl: './customer-support.component.html',
  styleUrl: './customer-support.component.scss'
})
export class CustomerSupportComponent {
  inquiries$: Observable<any[]>;
  selectedInquiry: any = null;
  userDetails: any = null;
  responseMessage: string = '';
  private readonly dialogs = inject(TuiDialogService);
    private theme = { color: '#ff7043' }; 
  constructor(private firestore: Firestore) {
    const inquiriesRef = collection(this.firestore, 'contact_inquiries');
    this.inquiries$ = collectionData(inquiriesRef, { idField: 'id' });
  }
  protected showDialog(message: string, title: string): void {
    this.theme.color = '#ffdd2d'; 
    this.dialogs.open(message, { label: title }).subscribe({
      complete: () => {
        this.theme.color = '#ff7043'; // ✅ Reset color after closing
      },
    });
  }


  async viewDetails(inquiry: any) {
    this.selectedInquiry = inquiry;

    // Fetch user details from "users" collection using userId
    const userRef = doc(this.firestore, `users/${inquiry.userId}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      this.userDetails = userSnap.data();
    } else {
      this.userDetails = { name: 'Unknown', email: 'Not found' };
    }
  }

  async sendResponse() {
    if (this.selectedInquiry && this.responseMessage) {
      const inquiryRef = doc(this.firestore, `contact_inquiries/${this.selectedInquiry.id}`);

      try {
        await updateDoc(inquiryRef, {
          response: this.responseMessage,
          respondedAt: serverTimestamp(),
          status: 'Resolved'
        });
        this.showDialog('Response sent Successfully', 'Success');
        this.responseMessage = '';
      } catch (error) {
        console.error('Error sending response:', error);
      }
    }
  }
}
