import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TuiButton, TuiDialogService } from '@taiga-ui/core';
import { ShipmentFormComponent } from './shipment-form/shipment-form.component';
import { NgIf } from '@angular/common';
import { ShipmentSummaryComponent } from './shipment-summary/shipment-summary.component';
import { TrackComponent } from './track/track.component';
import { ShipmentService } from '../../Service/shipment.service';
import { Shipment } from '../../Modal/shipment';
import { Subject } from 'rxjs';
import { SnackBarComponent } from '../../Utility/snack-bar/snack-bar.component';
import { LoaderComponent } from '../../Utility/loader/loader.component';
import { DialogService } from '../../Service/dialog.service';

@Component({
  selector: 'shipment',
  imports: [TuiButton, 
    ShipmentFormComponent,
     NgIf, 
     ShipmentSummaryComponent,
    TrackComponent, SnackBarComponent, LoaderComponent],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent {
  showWelcomeNote: boolean = true;
  showShipmentForm: boolean = false;
  showSummary: boolean = false;
  shipmentDetails: any = null;
  shipmentToEdit: any = null;
  showTrackForm: boolean = false;
  private shipmentService: ShipmentService = inject(ShipmentService);
  shipment: Shipment | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef)
  shipmentSubject: Subject<Shipment> = new Subject();
  constructor(private dialogService: DialogService) {}
  private readonly dialogs = inject(TuiDialogService);
  private theme = { color: '#ff7043' }; 


    protected showDialog(message: string, title: string): void {
      this.theme.color = '#ffdd2d'; 
      this.dialogs
        .open(message, { label: title })
        .subscribe({
          complete: () => {
            this.theme.color = '#ff7043'; 
          },
        });
    }

  onShowShipmentForm(value?: any){
    this.showShipmentForm = true;
    this.showWelcomeNote = false;
  }
  
  onShowFormToHome(value: any){
    this.showShipmentForm = false;
    this.showWelcomeNote = true;
  }

  // handling show summary event emitted

  handleShowSummary(details: any){
    this.shipmentDetails = details;
    this.showSummary = true;
    this.showShipmentForm = false;
    
  }

  handleEditDetails(details: any){
   this.shipmentToEdit = details;
   this.showShipmentForm = true;
   this.showSummary = false;
  }

  handleConfirmShipment(value:any) {
    if (!this.shipmentDetails) {
      console.error("Shipment details are undefined or empty!");
      return;
    }
  
    this.dialogService
    .showDialog(
      'Are you sure you want to send the shipment order?',
      'Confirm Shipment',
      'Yes', 
      'No' 
    )
    .subscribe((confirmed) => {
      if (confirmed) {
        this.showSummary = false;
        this.isLoading = true;
        this.shipmentService.createShipment(this.shipmentDetails)
        .then((trackingNumber) => {
          this.showDialog(`Shipment created susccessfully with tracking number: ${trackingNumber}, keep it safely.
            It would be use to track the shipment and confirm delivery by the Recipient`, 'Success');
        
          this.shipmentDetails.trackingNumber = trackingNumber;
          this.isLoading = false;
          this.showWelcomeNote = true;
        })
        .catch((error) => {
          console.error('Error creating shipment:', error);
          this.isLoading = false;
        
          this.showDialog('An error occurred while creating the shipment. Please try again.', 'Error');
        });
        
      } else {
        // User canceled the action
        console.log('Shipment creation canceled');
      }
    });

  }
  
  

  handleCollapseTrackForm(value: any){
   this.showTrackForm = false;
  }

  onShowTrackForm(){
    this.showTrackForm = true;
    
  }

  handleSubmitTrackN(trackingNumber: string) {
    console.log('Tracking number received:', trackingNumber);

    this.shipmentService.getShipmentByTrackingNumber(trackingNumber)
      .then((shipment: Shipment) => {
        this.shipmentSubject.next(shipment);
        console.log('Fetched shipment:', shipment);
      })
      .catch((error) => {
        this.errorMessage = 'Error fetching shipment details.';
        console.error(error);
      });
  }
  
  
  
  
  
}
