import { Component, EventEmitter, Output, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import { Shipment } from '../../../Modal/shipment';
import { LoaderComponent } from '../../../Utility/loader/loader.component';
import { NgIf } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-track',
  imports: [TuiCardLarge, TuiButton, TuiAppearance,
            ReactiveFormsModule,
            TuiDataListWrapper,
            TuiInputModule,
            LoaderComponent,
            NgIf
  ],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackComponent implements OnDestroy {
  showTrackForm: boolean = false;
  trackingNumber: string = '';
  shipment: Shipment | null = null;
  isLoading: boolean = false;
  showTrack: boolean = false;
  showFormNote: boolean = true;
  private shipmentSubscription: Subscription | null = null;

  @Input() shipmentSubject: Subject<Shipment> | null = null;

  @Output()
  collapseTrackForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submitTrckN = new EventEmitter();

  protected readonly form = new FormGroup({
    trackId: new FormControl('', Validators.required),
  });

  ngOnInit() {
    if (this.shipmentSubject) {
      this.shipmentSubscription = this.shipmentSubject.subscribe((shipment: Shipment) => {
        this.shipment = shipment;
        this.showTrack = true; // Ensure the track details are shown
      });
    }
  }

  ngOnDestroy() {
    if (this.shipmentSubscription) {
      this.shipmentSubscription.unsubscribe();
    }
  }

  onCollapseTrackForm() {
    this.collapseTrackForm.emit();
  }

  onSubmitTrckN() {
    if (this.form.valid) {
      this.submitTrckN.emit(this.form.value.trackId);
      this.form.reset();
      this.showFormNote = false;
      this.isLoading = true;
    } else {
      console.log('Form is invalid');
    }
  }
}