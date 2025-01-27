import { Component, inject, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiAppearance, TuiButton,TuiDialog,TuiDialogService} from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import {TuiAutoFocus, TuiThemeColorService} from '@taiga-ui/cdk';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'request',
  imports: [TuiButton, 
        TuiAppearance, 
        TuiCardLarge,
        ReactiveFormsModule,
        TuiAutoFocus,
        TuiButton,
        TuiDialog,
        TuiInputModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent {
  @Output()
  collapseRequestModal: EventEmitter<boolean> = new EventEmitter<boolean>()
  private readonly dialogs = inject(TuiDialogService);
  private readonly theme = inject(TuiThemeColorService);

  protected showDialog(): void {
      this.theme.color = '#ffdd2d';
      this.dialogs
          .open(
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              {label: 'Delivery Request'},
          )
          .subscribe({
              complete: () => {
                  this.theme.color = '#ff7043';
                 
              },
          });this.collapseRequestModal.emit()
          
  }

  protected exampleForm = new FormGroup({
    exampleControl: new FormControl(''),
});

protected open = false;

protected show(): void {
    this.open = true
  
    
}
}
