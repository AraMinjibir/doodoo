import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton, TuiDropdown } from '@taiga-ui/core';
import { User } from '../../Modal/user';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { AdminService } from '../../Service/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  TuiFilterByInputPipe } from '@taiga-ui/kit';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {
    TuiComboBoxModule,
    TuiInputModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TuiCardLarge } from '@taiga-ui/layout';

@Component({
  selector: 'manage-users',
  standalone: true,
  imports: [
    TuiTable,TuiAppearance, TuiButton, AsyncPipe,
    ReactiveFormsModule,TuiDropdown,NgIf,
    TuiComboBoxModule,
    TuiMultiSelectModule,
    TuiSelectModule,TuiCardLarge,TuiAppearance,
    TuiTextfieldControllerModule, 
    TuiInputModule,TuiFilterByInputPipe,
    TableModule,CommonModule,
    ButtonModule
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {
  users$: Observable<User[]>;
  columns = ['email', 'role', 'status', 'actions'];
  userForm: FormGroup;
  isAddingOrEditing = false;
  editingUserId: string | null = null;
  roles = ['Administrator', 'Customer Support Agent', "Sender", 'Recipient', 'Service Provider']; 
  statuses = ['active', 'inactive'];
  roleOpen = false;
  statusOpen = false;
  filteredUsers$: Observable<User[]> | null = null;
  filterControl = new BehaviorSubject<string>('');
  itemsPerPage = 50;
  constructor(private adminService: AdminService, private fb: FormBuilder) {
  this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
  
    this.users$ = this.adminService.getAllUsers(); 
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.filterControl.pipe(startWith(''))
    ]).pipe(
      map(([users, filter]) => {
        const filteredUsers = users.filter(user => 
          user.email.toLowerCase().includes(filter.toLowerCase()) ||
          user.role.toLowerCase().includes(filter.toLowerCase()) ||
          user.status.toLowerCase().includes(filter.toLowerCase())
        );
        return filteredUsers.length ? filteredUsers : []; // Ensure it never returns null
      })
    );
    
    
  }  

  showAddUserForm() {
    this.isAddingOrEditing = true;
    this.editingUserId = null;
    this.userForm.reset();
  }
  
  editUser(user: User) {
    this.isAddingOrEditing = true;
    this.editingUserId = user.id;
    this.userForm.patchValue(user);
  }

  cancelForm() {
    this.isAddingOrEditing = false;
    this.userForm.reset();
  }

  selectRole(role: string) {
    this.userForm.patchValue({ role });
    this.roleOpen = false;
  }

  selectStatus(status: string) {
    this.userForm.patchValue({ status });
    this.statusOpen = false;
  }

  onSubmit() {
    if (this.editingUserId) {
      this.adminService.updateUser(this.editingUserId, this.userForm.value).then(() => {
        this.cancelForm();
      });
    } else {
      this.adminService.createUser(this.userForm.value).then(() => {
        this.cancelForm();
      });
    }
  }

  deleteUser(user: User) {
    this.adminService.deleteUser(user.id);
  }
  
}