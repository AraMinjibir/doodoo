import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ReceivePackageComponent } from './receive-package/receive-package.component';
import { NgIf } from '@angular/common';
import { ConfirmDeliveryComponent } from './confirm-delivery/confirm-delivery.component';

@Component({
  selector: 'recipient',
  imports: [TuiButton, ReceivePackageComponent,
    NgIf,ConfirmDeliveryComponent
  ],
  templateUrl: './recipient.component.html',
  styleUrl: './recipient.component.scss'
})
export class ReceipientComponent {

  showReceivePackageForm: boolean = false;
  showWelcomeNote: boolean = true;
  showConfirmDelivery:boolean = false;
  

  onShowPackageForm(){
    this.showReceivePackageForm = true;
    this.showWelcomeNote = false;
  }
  onShowConfirmDelivery(){
    this.showConfirmDelivery = true;
    this.showWelcomeNote = false
  }

  handleOncollapseForm(value: any){
    this.showReceivePackageForm = false;
    this.showWelcomeNote = true;
  }

  handleOnCloseForm(value: boolean){
    this.showConfirmDelivery = false;
    this.showWelcomeNote = true;
  }
}
