import { Component, EventEmitter, Output } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiDialog,TuiDialogService} from '@taiga-ui/core';
import {TuiAutoFocus, TuiThemeColorService} from '@taiga-ui/cdk';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'confirm-delivery',
  imports: [TuiAppearance,
    TuiButton,
    TuiCardLarge,
    ReactiveFormsModule,
    TuiDataListWrapper,
    TuiInputModule,
    TuiDialog,
    TuiInputModule
  ],
  templateUrl: './confirm-delivery.component.html',
  styleUrl: './confirm-delivery.component.scss'
})
export class ConfirmDeliveryComponent {
  @Output()
  closeForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected exampleForm = new FormGroup({
    exampleControl: new FormControl(''),
});

protected open = false;

protected show(): void {
    this.open = true
  
    
}
}
