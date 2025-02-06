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
  shipmentData: any = null; // To store shipment details

  // Inject services
  private readonly shipmentService = inject(ShipmentService);
  private readonly dialogs = inject(TuiDialogService);
  private theme = { color: '#ff7043' }; // Just an example color theme

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    // Initialize forms with validation
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.trackingForm = this.fb.group({
      trackingNumber: ['', [Validators.required]],
    });
  }

  // Method to show dialog with dynamic content
  protected showDialog(message: string, title: string): void {
    this.theme.color = '#ffdd2d'; // You can change color based on status or message
    this.dialogs
      .open(message, { label: title })
      .subscribe({
        complete: () => {
          this.theme.color = '#ff7043'; // Reset color after the dialog closes
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
          // If shipment found, display additional details
          const message = `
            Package found for ${shipmentData.recipientName}.
            <br>Tracking Number: ${shipmentData.trackingNumber}
            <br>Sender: ${shipmentData.senderName}
            <br>Package Contents: ${shipmentData.pckCont}
            <br>Weight: ${shipmentData.weight}
            <br>Dimensions: ${shipmentData.dimensions}
          `;
          this.shipmentData = shipmentData; // Store shipment data for later use
          this.showConfirmDelivery = true;  // Set flag to show confirm delivery modal
          this.showDialog(message, 'Package Found');  
        } else {
          // If no shipment found, show error dialog
          this.showDialog('No shipment found for this email!', 'Error');
        }
      } catch (error) {
        // If there is an error fetching shipment, show an error dialog
        this.showDialog('Error fetching shipment details. Please try again later.', 'Error');
      }
    } else {
      // If the form is invalid, show a warning dialog
      this.showDialog('Please enter a valid email address.', 'Warning');
    }
  }
  

  async onConfirmDelivery(): Promise<void> {
    const trackingNumber = this.trackingForm.value.trackingNumber;
    const docId = this.shipmentData.docId;  // Get the document ID from stored shipment data
  
    // Proceed only if tracking number matches
    if (this.trackingForm.valid && trackingNumber === this.shipmentData.trackingNumber) {
      try {
        // Ensure estimatedDeliveryDate is updated to the current date (or whatever logic you want)
        const updatedShipmentData = {
          ...this.shipmentData,
          isDelivered: true,
          estimatedDeliveryDate: Timestamp.now(), // Set current timestamp as estimated delivery date
        };
  
        // Call the service to update the shipment status using docId
        await this.shipmentService.updateShipmentStatus(docId, updatedShipmentData);
  
        // Show confirmation dialog
        this.showDialog('Delivery confirmed! The shipment status has been updated to "Delivered".', 'Success');
      } catch (error) {
        // If there is an error updating status, show error dialog
        this.showDialog('Error confirming delivery. Please try again later.', 'Error');
      }
    } else {
      // If tracking number does not match, show error
      this.showDialog('Invalid tracking number. Please try again.', 'Error');
    }
  }
  
}
