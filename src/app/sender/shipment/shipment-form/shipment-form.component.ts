import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiCardLarge} from '@taiga-ui/layout';
import {FormControl,  FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiDataListWrapper} from '@taiga-ui/kit';
import {TuiInputModule} from '@taiga-ui/legacy';
import { NgFor } from '@angular/common';

@Component({
  selector: 'shipment-form',
  imports: [
      TuiAppearance,
        TuiButton,
        TuiCardLarge,
        ReactiveFormsModule,
        TuiDataListWrapper,
        TuiInputModule,
        NgFor                 
  ],
  templateUrl: './shipment-form.component.html',
  styleUrl: './shipment-form.component.scss'
})
export class ShipmentFormComponent {
  fields = [
    {type: "text", placeholder: "Enter Recipient Name", formControlName: "recipientName"},
    {type: "text", placeholder: "Enter Recipient Address", formControlName: "recipientAdd"},
    {type: "email", placeholder: "Enter Recipient Email", formControlName: "recipientEm"},
    {type: "text", placeholder: "Enter Recipient Phone", formControlName: "recipientPh"},
    {type: "text", placeholder: "Enter Package Contents", formControlName: "pckCont"}
  ]
    protected readonly form = new FormGroup({
        recipientName: new FormControl(''),
        recipientAdd: new FormControl(),
        recipientEm: new FormControl(),
        recipientPh: new FormControl(),
        pckCont: new FormControl(),
        weight: new FormControl(),
        dimensions: new FormControl(),

    });

    // conditional logic
    showShipmentForm: boolean = false;

    @Output()
    showShipmentFormToHome: EventEmitter<boolean> = new EventEmitter<boolean>();

    onShowShipmentForm(){
      this.showShipmentFormToHome.emit(this.showShipmentForm);
    }
    
    OnCollapseForm(){
      this.showShipmentFormToHome.emit();
    }     
}
