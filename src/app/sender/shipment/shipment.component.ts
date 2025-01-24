import { Component, inject } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ShipmentFormComponent } from './shipment-form/shipment-form.component';
import { NgIf } from '@angular/common';
import { ShipmentSummaryComponent } from './shipment-summary/shipment-summary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'shipment',
  imports: [TuiButton, ShipmentFormComponent, NgIf, ShipmentSummaryComponent],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent {
  router: Router = inject(Router);
  showWelcomeNote: boolean = true;
  showShipmentForm: boolean = false;
  showSummary: boolean = false;
  shipmentDetails: any = null;
  shipmentToEdit: any = null;

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
    this.showShipmentForm = true;
    this.showSummary = false;
    
  }
}
