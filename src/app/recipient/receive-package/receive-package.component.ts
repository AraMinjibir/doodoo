import { Component, EventEmitter, Output } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'receive-package',
  imports: [TuiAppearance,
          TuiButton,
          TuiCardLarge,
          ReactiveFormsModule],
  templateUrl: './receive-package.component.html',
  styleUrl: './receive-package.component.scss'
})
export class ReceivePackageComponent {
  @Output()
  collapseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected readonly form = new FormGroup({
      
  });
  onCollapseForm(){
    this.collapseForm.emit();
  }
}
