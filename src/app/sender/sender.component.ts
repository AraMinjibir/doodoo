import { Component } from '@angular/core';
import { ShipmentComponent } from './shipment/shipment.component';

@Component({
  selector: 'sender',
  imports: [ShipmentComponent],
  templateUrl: './sender.component.html',
  styleUrl: './sender.component.scss'
})
export class SenderComponent {

}
