import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';

@Component({
  selector: 'picking-up',
  imports: [TuiAppearance,
            TuiButton,
            TuiCardLarge,
            ReactiveFormsModule],
  templateUrl: './picking-up-delivery.component.html',
  styleUrl: './picking-up-delivery.component.scss'
})
export class PickingUpDeliveryComponent {
  @Output()
  collapseCard:EventEmitter<boolean> = new EventEmitter<boolean>();

    onCollapseCard(){
      this.collapseCard.emit();
    }
}
