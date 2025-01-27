import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { PickingUpDeliveryComponent } from './picking-up/picking-up';
import { NgIf } from '@angular/common';
import { RequestComponent } from './picking-up/request/request.component';

@Component({
  selector: 'service-provider',
  imports: [TuiButton, PickingUpDeliveryComponent, NgIf, RequestComponent],
  templateUrl: './service-provider.component.html',
  styleUrl: './service-provider.component.scss'
})
export class ServiceProviderComponent {
  showPickUpCard: boolean =false;
  showWelcomeNote: boolean = true;
  showRequest: boolean = false;

  onShowPickUpCard(){
    this.showPickUpCard = true;
    this.showWelcomeNote = false
  }
  handleOnCollapseCard(value: boolean){
    this.showPickUpCard = false;
    this.showWelcomeNote = true;
  }
  onShowRequestCard(){
    this.showRequest = true;
    this.showWelcomeNote = false
  }
  handleOncollapseRequestModal(value: boolean){
    this.showRequest = false;
    this.showWelcomeNote = true;
  }
}
