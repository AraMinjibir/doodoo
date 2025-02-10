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
                users.filter(user => 
                    user.email.toLowerCase().includes(filter.toLowerCase()) ||
                    user.role.toLowerCase().includes(filter.toLowerCase()) ||
                    user.status.toLowerCase().includes(filter.toLowerCase())
                )
            )
        );
    }

    async addUser() {
        const newUser: User = {
            id: '',
            name: 'New User',
            email: 'newuser@example.com',
            role: 'customer',
            status: 'active',
            createdAt: new Date().toISOString()
        };
        await this.adminService.createUser(newUser);
    }

    async editUser(user: User) {
        await this.adminService.updateUser(user.id, { status: 'active' });
    }

    async deleteUser(user: User) {
        await this.adminService.deleteUser(user.id);
    }
}
