import { Component } from '@angular/core';
import { NgForOf} from '@angular/common';
import {TuiTable} from '@taiga-ui/addon-table';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
@Component({
  selector: 'manage-users',
  imports: [NgForOf, TuiTable, TuiAppearance, TuiCardLarge, TuiButton],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {

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

    addUser(){

    }
    editUser(value: any){

    }
    deleteUser(value: any){

    }
}




