import { Component, inject, NgZone } from '@angular/core';
import { TuiAppearance, TuiButton, TuiDialogService } from '@taiga-ui/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShipmentService } from '../Service/shipment.service';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiCardLarge } from '@taiga-ui/layout';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'recipient',
  imports: [TuiButton,
     TuiInputModule,TuiCardLarge, TuiAppearance,
    NgIf, ReactiveFormsModule
  ],
  templateUrl: './recipient.component.html',
  styleUrl: './recipient.component.scss'
})
export class ReceipientComponent {

  showReceivePackageForm: boolean = false;
  showConfirmDelivery: boolean = false;
  emailForm: FormGroup;
  trackingForm: FormGroup;
  shipmentData: any = null; // store shipment details
  
  private readonly shipmentService = inject(ShipmentService);
  private readonly dialogs = inject(TuiDialogService);
  private theme = { color: '#ff7043' }; 

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
   
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.trackingForm = this.fb.group({
      trackingNumber: ['', [Validators.required]],
    });
  }

  // Method to show dialog with dynamic content
  protected showDialog(message: string, title: string): void {
    this.theme.color = '#ffdd2d'; 
    this.dialogs
      .open(message, { label: title, data: { customClass: 'custom-dialog' } })
      .subscribe({
        complete: () => {
          this.theme.color = '#ff7043'; 
        },
      });
  }

  // Method triggered on form submission (email)
  async onReceivePackage(): Promise<void> {
    const email = this.emailForm.value.email; // Fetch email from form
  
    if (this.emailForm.valid) {
      console.log('Email entered:', email);
      try {
        // Call the service to get shipment details by email
        const shipmentData = await this.shipmentService.getShipmentByRecipientEmail(email);
  
        if (shipmentData) {
          // Store shipment data for later use
          this.shipmentData = shipmentData;
  
          // Hide the Receive Package form and show the Confirm Delivery form
          this.showReceivePackageForm = false;
          this.showConfirmDelivery = true;
  
          // Show confirmation dialog
          const message = `
            Package found for ${shipmentData.recipientName}.
            <br>Sender: ${shipmentData.senderName}
            <br>Package Contents: ${shipmentData.pckCont}
          `;
          this.showDialog(message, 'Package Found');
          this.showReceivePackageForm = true;
        } else {
          this.showDialog('No shipment found for this email!', 'Error');
        }
      } catch (error) {
        this.showDialog('Error fetching shipment details. Please try again later.', 'Error');
      }
    } else {
      this.showDialog('Please enter a valid email address.', 'Warning');
    }
  }
  
  
  async onConfirmDelivery(): Promise<void> {
    const trackingNumber = this.trackingForm.value.trackingNumber;
    const docId = this.shipmentData?.docId;
  
    if (this.trackingForm.valid && trackingNumber === this.shipmentData.trackingNumber) {
      try {
        
        const updateData = {
          status: "Delivered", 
          isDelivered: true,   
          deliveryDate: Timestamp.now(), 
        };
        await this.shipmentService.updateShipmentStatus(docId, updateData);
  
        this.showConfirmDelivery = false;
        this.showReceivePackageForm = true;
        this.emailForm.reset();
        this.trackingForm.reset();
  
        this.showDialog('Delivery confirmed! The shipment status has been updated to "Delivered".', 'Success');
      } catch (error) {
        this.showDialog('Error confirming delivery. Please try again later.', 'Error');
      }
    } else {
      this.showDialog('Invalid tracking number. Please try again.', 'Error');
    }
  }
  
  
  
  
  
  
}
