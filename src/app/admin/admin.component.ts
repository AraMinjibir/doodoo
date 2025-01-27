import { Component } from '@angular/core';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { NgIf } from '@angular/common';
import { MonitorShipmentComponent } from './monitor-shipment/monitor-shipment.component';

@Component({
  selector: 'admin',
  imports: [ManageUsersComponent,MonitorShipmentComponent, TuiButton, 
    TuiAppearance, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  showManagerUsers: boolean = false
  showMonitorShipment: boolean = false

  onShowManageUsers(){
    this.showManagerUsers = true;
  }

  onShowMonitorShipment(){
    this.showMonitorShipment = true;
  }
}
