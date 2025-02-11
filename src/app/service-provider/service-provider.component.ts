import { ChangeDetectorRef, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { PickingUpDeliveryComponent } from './picking-up/picking-up';
import { NgIf } from '@angular/common';
import { DeliveryComponent } from './delivery/delivery.component';

@Component({
  selector: 'service-provider',
  imports: [TuiButton, PickingUpDeliveryComponent, NgIf, DeliveryComponent],
  templateUrl: './service-provider.component.html',
  styleUrl: './service-provider.component.scss'
})
export class ServiceProviderComponent {
  showPickupComponent = false;
  showDeliveryComponent = false;

  constructor(private cdr: ChangeDetectorRef) {}

showPickup(): void {
  console.log('📦 Show Pickup clicked');
  this.showPickupComponent = true;
  this.showDeliveryComponent = false;
  this.cdr.detectChanges(); 
}

showDelivery(): void {
  console.log('🚚 Show Delivery clicked');
  this.showDeliveryComponent = true;
  this.showPickupComponent = false;
  this.cdr.detectChanges(); 
}
}
