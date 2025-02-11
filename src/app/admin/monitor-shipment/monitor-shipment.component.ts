import { AsyncPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiInputModule } from '@taiga-ui/legacy';
import { AdminService } from '../../Service/admin.service';
import { Observable, combineLatest, from } from 'rxjs';
import { User } from '../../Modal/user';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'monitor-shipment',
  standalone: true,
  imports: [
    NgForOf, TuiTable, TuiAppearance, 
    TuiCardLarge, TuiButton, TuiInputModule,
    TuiAppearance, AsyncPipe, ReactiveFormsModule
  ],
  templateUrl: './monitor-shipment.component.html',
  styleUrl: './monitor-shipment.component.scss'
})
export class MonitorShipmentComponent {
    filterControl = new FormControl('');
    users$: Observable<User[]>;
    filteredUsers$: Observable<User[]>;
    columns = ['email', 'role', 'status'];

    constructor(private adminService: AdminService) {
        this.users$ = from(this.adminService.getAllUsers());

        // Apply filtering logic
        this.filteredUsers$ = combineLatest([
            this.users$,
            this.filterControl.valueChanges.pipe(startWith(''))
        ]).pipe(
            map(([users, filter]) => 
                users.filter(user => {
                    const email = user.email ? user.email.toLowerCase() : ''; 
                    const role = user.role ? user.role.toLowerCase() : '';
                    const status = user.status ? user.status.toLowerCase() : '';
        
                    return email.includes(filter.toLowerCase()) ||
                           role.includes(filter.toLowerCase()) ||
                           status.includes(filter.toLowerCase());
                })
            )
        );
        
    }

   
}
