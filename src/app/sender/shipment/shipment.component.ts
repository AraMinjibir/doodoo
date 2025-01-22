import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ShipmentFormComponent } from './shipment-form/shipment-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'shipment',
  imports: [TuiButton, ShipmentFormComponent, NgIf],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent {

  showWelcomeNote: boolean = true;
  showShipmentForm: boolean = false;
  
  onShowShipmentForm(value?: any){
    this.showShipmentForm = true;
    this.showWelcomeNote = false;
  }
  
  onShowFormToHome(value: any){
    this.showShipmentForm = false;
    this.showWelcomeNote = true;
  }

}
