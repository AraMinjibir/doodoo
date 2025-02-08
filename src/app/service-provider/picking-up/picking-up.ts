import { Component,inject} from '@angular/core';
import { TuiAppearance, TuiButton,TuiDialogService } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { ShipmentService } from '../../Service/shipment.service';
import { NgFor, NgIf } from '@angular/common';
import { Firestore} from '@angular/fire/firestore';


@Component({
  selector: 'picking-up',
  imports: [TuiButton, 
            TuiCardLarge,TuiAppearance,
            NgFor, NgIf
  ],
  templateUrl: './picking-up.html',
  styleUrl: './picking-up.scss'
})
export class PickingUpDeliveryComponent {
    pickupRequests: any[] = [];
    private firestore: Firestore = inject(Firestore)

    constructor(
      private shipmentService: ShipmentService,
      private dialogService: TuiDialogService
    ) {}
  
    async ngOnInit(): Promise<void> {
        await this.loadPickupRequests();
      }
    
      async loadPickupRequests(): Promise<void> {
        this.pickupRequests = await this.shipmentService.getPickupRequests();
        console.log('🚚 UI Updated with Pending Shipments:', this.pickupRequests);
      }
    
      async pickupPackage(shipmentId: string): Promise<void> {
        await this.shipmentService.pickupPackage(shipmentId);
        this.showDialog('Package picked up successfully!', 'Pickup Request');
        
        await this.loadPickupRequests(); // Refresh the list
      }
    
      private showDialog(message: string, label: string): void {
        this.dialogService.open(message, { label }).subscribe({
          complete: () => console.log('✅ Modal closed')
        });
      }

}
