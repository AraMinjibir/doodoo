import { Component, EventEmitter, Output } from '@angular/core';
import { TuiAppearance, tuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';

@Component({
  selector: 'delivery',
  imports: [TuiButton, TuiCardLarge,TuiAppearance],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {
  @Output()
  collapseDeliveryCard: EventEmitter<boolean> = new EventEmitter<boolean>();

  onCollapseDeliveryCard(){
    this.collapseDeliveryCard.emit();
  }

  update(){
    this.onCollapseDeliveryCard();
  }
}
