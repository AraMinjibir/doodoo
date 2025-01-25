import { Component, EventEmitter, Output } from '@angular/core';
import { TuiAppearance, TuiButton} from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import {FormControl,  FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-track',
  imports: [TuiCardLarge,TuiButton, TuiAppearance,
            ReactiveFormsModule,
            TuiDataListWrapper,
            TuiInputModule
  ],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackComponent {
  showTrackForm: boolean = false;

  @Output()
  collapseTrackForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected readonly form = new FormGroup({
    id: new FormControl('', Validators.required),
    
});

onCollapseTrackForm(){
  this.collapseTrackForm.emit()
}
onSubmitId(){
  if(this.form.valid){
    this.form.reset();
    alert("Track sent successfully")
  }else
    console.log('Form is invalid')
}
}
