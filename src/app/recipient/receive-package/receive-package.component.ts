import { Component, EventEmitter, Output, inject} from '@angular/core';
import { TuiAppearance, TuiButton, TuiDialog,TuiDialogService } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import {TuiAutoFocus, TuiThemeColorService} from '@taiga-ui/cdk';

@Component({
  selector: 'receive-package',
  imports: [TuiAppearance,
          TuiButton,
          TuiCardLarge,
          TuiButton, 
          TuiAppearance, 
          TuiCardLarge,
          TuiButton,],
  templateUrl: './receive-package.component.html',
  styleUrl: './receive-package.component.scss'
})
export class ReceivePackageComponent {
  private readonly dialogs = inject(TuiDialogService);
    private readonly theme = inject(TuiThemeColorService);

  @Output()
  collapseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

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
        });this.collapseForm.emit()
        
}
}
