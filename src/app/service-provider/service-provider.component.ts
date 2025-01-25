import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { PickingUpDeliveryComponent } from './picking-up-delivery/picking-up-delivery.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'service-provider',
  imports: [TuiButton, PickingUpDeliveryComponent, NgIf],
  templateUrl: './service-provider.component.html',
  styleUrl: './service-provider.component.scss'
})
export class ServiceProviderComponent {
  showPickUpCard: boolean =false;
  showWelcomeNote: boolean = true;
  onShowPickUpCard(){
    this.showPickUpCard = true;
    this.showWelcomeNote = false
  }
  handleOnCollapseCard(value: boolean){
    this.showPickUpCard = false;
    this.showWelcomeNote = true;
  }
}
