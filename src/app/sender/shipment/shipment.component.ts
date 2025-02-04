import { Component, inject } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ShipmentFormComponent } from './shipment-form/shipment-form.component';
import { NgIf } from '@angular/common';
import { ShipmentSummaryComponent } from './shipment-summary/shipment-summary.component';
import { TrackComponent } from './track/track.component';
import { ShipmentService } from '../../Service/shipment.service';
import { Shipment } from '../../Modal/shipment';

@Component({
  selector: 'shipment',
  imports: [TuiButton, 
    ShipmentFormComponent,
     NgIf, 
     ShipmentSummaryComponent,
    TrackComponent],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent {
  showWelcomeNote: boolean = true;
  showShipmentForm: boolean = false;
  showSummary: boolean = false;
  shipmentDetails: any = null;
  shipmentToEdit: any = null;
  showTrackForm: boolean = false;
  constructor(private shipmentService: ShipmentService) {}


  onShowShipmentForm(value?: any){
    this.showShipmentForm = true;
    this.showWelcomeNote = false;
  }
  
  onShowFormToHome(value: any){
    this.showShipmentForm = false;
    this.showWelcomeNote = true;
  }

  // handling show summary event emitted

  handleShowSummary(details: any){
    this.shipmentDetails = details;
    this.showSummary = true;
    this.showShipmentForm = false;
    
  }

  handleEditDetails(details: any){
   this.shipmentToEdit = details;
   this.showShipmentForm = true;
   this.showSummary = false;
  }

  handleConfirmShipment(value:any) {
    if (!this.shipmentDetails) {
      console.error("Shipment details are undefined or empty!");
      return;
    }
  
    if (confirm('Are you sure you want to send the shipment order?')) {

      this.showSummary = false;
      this.shipmentService.createShipment(this.shipmentDetails)
        .then((trackingNumber) => {
          alert(`Shipment created with tracking number: ${trackingNumber}`);
          // Update shipmentDetails with tracking number
          this.shipmentDetails.trackingNumber = trackingNumber;
        })
        .catch(error => {
          console.error("Error creating shipment:", error);
        });
    }
  }
  
  

  handleCollapseTrackForm(value: any){

  }
  onShowTrackForm(){
    this.showTrackForm = true
  }
}
