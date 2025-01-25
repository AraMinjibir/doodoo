import { Component } from '@angular/core';
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
  showPickUpCard: boolean =false;
  showWelcomeNote: boolean = true;
  showDeliveryCard: boolean = false;

  onShowPickUpCard(){
    this.showPickUpCard = true;
    this.showWelcomeNote = false
  }
  onShowDeliveryCard(){
    this.showDeliveryCard = true;
    this.showWelcomeNote = false
  }

  handleOnCollapseCard(value: boolean){
    this.showPickUpCard = false;
    this.showWelcomeNote = true;
  }

  handleOnCollapseDeliveryCard(value:boolean){
    this.showDeliveryCard = false;
    this.showWelcomeNote = true;
  }
}
