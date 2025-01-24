import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';

@Component({
  selector: 'summary',
  imports: [TuiCardLarge, TuiButton, TuiAppearance],
  templateUrl: './shipment-summary.component.html',
  styleUrl: './shipment-summary.component.scss'
})
export class ShipmentSummaryComponent {

  @Input() 
  shipmentDetails: any = {};


  @Output()
  confirmShipment =  new EventEmitter();

  @Output()
  editDetails = new EventEmitter();

  onEditDetails(){
    this.editDetails.emit(this.shipmentDetails);
    
    
  }

  onConfirmShipment(){
    this.confirmShipment.emit()
  }
}
