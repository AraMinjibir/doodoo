import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ShipmentFormComponent } from './shipment-form/shipment-form.component';
import { NgIf } from '@angular/common';
import { ShipmentSummaryComponent } from './shipment-summary/shipment-summary.component';
import { TrackComponent } from './track/track.component';

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
  handleConfirmShipment(value: any){
    confirm('Are sure you want to send the shipment oder?');
    this.showSummary = false;
    
  }

  onShowTrackForm(){
    this.showTrackForm = true;
    this.showWelcomeNote = false
  }
  handleCollapseTrackForm(value: any){
    this.showTrackForm = false;
    this.showWelcomeNote = true
  }
 
}
