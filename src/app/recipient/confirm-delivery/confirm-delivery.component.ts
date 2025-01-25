import { Component, EventEmitter, Output } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiDataListWrapper } from '@taiga-ui/kit';

@Component({
  selector: 'confirm-delivery',
  imports: [TuiAppearance,
    TuiButton,
    TuiCardLarge,
    ReactiveFormsModule,
    TuiDataListWrapper,
    TuiInputModule
  ],
  templateUrl: './confirm-delivery.component.html',
  styleUrl: './confirm-delivery.component.scss'
})
export class ConfirmDeliveryComponent {
  @Output()
  closeForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected readonly form = new FormGroup({
    sign: new FormControl('', Validators.required),
  });

  handleOncollapseForm(){
    this.closeForm.emit();
  }
}
