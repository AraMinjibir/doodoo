import { Component, EventEmitter, Input, Output, output, SimpleChanges } from '@angular/core';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {TuiCardLarge} from '@taiga-ui/layout';
import {FormControl,  FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiDataListWrapper} from '@taiga-ui/kit';
import {TuiInputModule} from '@taiga-ui/legacy';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'shipment-form',
  imports: [
      TuiAppearance,
        TuiButton,
        TuiCardLarge,
        ReactiveFormsModule,
        TuiDataListWrapper,
        TuiInputModule,
        NgFor,NgIf                
  ],
  templateUrl: './shipment-form.component.html',
  styleUrl: './shipment-form.component.scss'
})
export class ShipmentFormComponent {
  // input form array
  fields = [
    {type: "text", placeholder: "Enter Recipient Name", formControlName: "recipientName"},
    {type: "text", placeholder: "Enter Recipient Address", formControlName: "recipientAdd"},
    {type: "email", placeholder: "Enter Recipient Email", formControlName: "recipientEm"},
    {type: "text", placeholder: "Enter Recipient Phone", formControlName: "recipientPh"},
    {type: "text", placeholder: "Enter Package Contents", formControlName: "pckCont"}
  ]
  
  protected readonly form = new FormGroup({
        recipientName: new FormControl('', Validators.required),
        recipientAdd: new FormControl('',Validators.required),
        recipientEm: new FormControl('',Validators.email),
        recipientPh: new FormControl('',Validators.required),
        pckCont: new FormControl('',Validators.required),
        weight: new FormControl('',Validators.required),
        dimensions: new FormControl('',Validators.required),
    });

    // conditional logic
    showShipmentForm: boolean = false;
    shippingCost: number | null = null;

    // event emission to show shipment form to parent
    @Output()
    showShipmentFormToHome: EventEmitter<boolean> = new EventEmitter<boolean>();

    // event emision to show form summary to parent
    @Output() 
    showSummary: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    shipmentDetails: any;

    //  Emitting event
    onShowShipmentForm(){
      this.showShipmentFormToHome.emit(this.showShipmentForm);
    }
    
    //  collapsing form method
    OnCollapseForm(){
      this.showShipmentFormToHome.emit();
    }     

    // calculate cost method
    calculateCost() {
      if (this.form.valid) {
        const weight = this.form.get('weight')?.value ?? '0'; // Default to '0' if null or undefined
        const dimension = this.form.get('dimensions')?.value ?? '0'; // Default to '0' if null or undefined
    
        // Parse the values to numbers
        const parsedWeight = parseFloat(weight.toString());
        const parsedDimension = parseFloat(dimension.toString());
    
        if (!isNaN(parsedWeight) && !isNaN(parsedDimension)) {
          this.shippingCost = parsedWeight * 5 + parsedDimension * 2;
          console.log('Calculated Shipping Cost:', this.shippingCost); // Debugging log
        } else {
          this.shippingCost = 0; // Fallback for invalid input
          console.log('Invalid weight or dimension provided');
        }
    
        // Include cost in shipment details
        const shipmentDetails = { ...this.form.value, cost: this.shippingCost };
        this.showSummary.emit(shipmentDetails); // Emit the details
        console.log('Shipment Details Emitted:', shipmentDetails);
    
        this.form.reset(); // Reset the form after calculation
      } else {
        console.log('Form is invalid');
      }
    }
    
    ngOnChanges(changes: SimpleChanges){
      if(changes['shipmentDetails'] && this.shipmentDetails){
        this.form.patchValue({
          recipientName: this.shipmentDetails.recipientName,
          recipientEm: this.shipmentDetails.recipientEm,
          recipientAdd: this.shipmentDetails.recipientAdd,
          recipientPh: this.shipmentDetails.recipientPh,
          pckCont: this.shipmentDetails.pckCont,
          weight:this.shipmentDetails.weight,
          dimensions:this.shipmentDetails.dimensions,
        })
        console.log('Form patched with shipment details:', this.form.value);
      }
    }
}
