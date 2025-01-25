import { Component, EventEmitter, Output } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';

@Component({
  selector: 'picking-up',
  imports: [TuiAppearance,
            TuiButton,
            TuiCardLarge],
  templateUrl: './picking-up.html',
  styleUrl: './picking-up.scss'
})
export class PickingUpDeliveryComponent {
  @Output()
  collapseCard:EventEmitter<boolean> = new EventEmitter<boolean>();

    onCollapseCard(){
      this.collapseCard.emit();
    }

    accept(){
      this.onCollapseCard();
    }
}
