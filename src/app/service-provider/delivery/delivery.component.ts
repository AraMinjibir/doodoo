import { Component } from '@angular/core';
import { ShipmentService } from '../../Service/shipment.service';
import { TuiAppearance, TuiButton, TuiDialogService } from '@taiga-ui/core';
import { NgFor, NgIf } from '@angular/common';
import { TuiCardLarge } from '@taiga-ui/layout';

@Component({
  selector: 'delivery',
  imports: [NgFor, TuiButton, TuiAppearance, TuiCardLarge, NgIf],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {

  deliveryRequests: any[] = [];

  constructor(
    private shipmentService: ShipmentService,
    private dialogService: TuiDialogService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('🚚 Delivery Component Loaded');
    this.deliveryRequests = await this.shipmentService.getDeliveryRequests();
    console.log('📦 Delivery Requests:', this.deliveryRequests);
  }
  

  // Handle package delivery
  async deliverPackage(shipmentId: string): Promise<void> {
    await this.shipmentService.deliverPackage(shipmentId);
    this.showDialog('Package delivered successfully!', 'Delivery Request');
    this.deliveryRequests = await this.shipmentService.getDeliveryRequests(); 
  }

  // Show modal with custom message and label
  private showDialog(message: string, label: string): void {
    this.dialogService
      .open(message, { label })
      .subscribe({
        complete: () => {
          console.log('Modal closed');
        },
      });
  }
}
