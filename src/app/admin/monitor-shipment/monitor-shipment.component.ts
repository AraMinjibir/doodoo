import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'monitor-shipment',
  imports: [NgForOf, TuiTable, TuiAppearance, TuiCardLarge, TuiButton, TuiInputModule, TuiAppearance],
  templateUrl: './monitor-shipment.component.html',
  styleUrl: './monitor-shipment.component.scss'
})
export class MonitorShipmentComponent {

  protected readonly users = [
    {
        name: 'Ara',
        email: "ara@gmail.com",
        role: "sender",
        status: "nonactive",
        actions: "",
    },
    {
        name: 'Ara',
        email: "ara@gmail.com",
        role: "recipient",
        status: "active"
    },
    {
        name: 'Ara',
        email: "ara@gmail.com",
        role: "service Provider",
        status: "active"
    },
    {
        name: 'Ara',
        email: "ara@gmail.com",
        role: "Admin",
        status: "active"
    },
    {
        name: 'Ara',
        email: "ara@gmail.com",
        role: "customer care",
        status: "inactive"
    },
] as const;

protected readonly columns = ['name', 'email', 'role', 'status', 'actions'];
}
