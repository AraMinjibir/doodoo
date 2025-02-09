import { Component } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiAppearance, TuiButton, TuiDropdown } from '@taiga-ui/core';
import { User } from '../../Modal/user';
import { Observable } from 'rxjs';
import { AdminService } from '../../Service/admin.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  TuiPagination } from '@taiga-ui/kit';
import {
    TuiComboBoxModule,
    TuiInputModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

@Component({
  selector: 'manage-users',
  standalone: true,
  imports: [
    NgForOf, TuiTable,TuiAppearance, TuiButton, AsyncPipe,
    ReactiveFormsModule,TuiDropdown,NgIf,
    TuiComboBoxModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiTextfieldControllerModule, 
    TuiInputModule,TuiPagination
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

  roles = ['Administrator', 'Customer', "Sender", 'Recipient', 'Service Provider']; 
  statuses = ['active', 'inactive'];
  
  roleOpen = false;
  statusOpen = false;

   // Pagination variables
   currentPage = 1; // Current page
   itemsPerPage = 50; // Number of items per page
   totalItems = 0; // Total number of items

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.users$ = this.adminService.getAllUsers();
    this.users$.subscribe(users => {
      this.totalItems = users.length; // ✅ Ensure totalItems is correctly set
    });
    this.userForm = new FormGroup({
      email: new FormControl ('',  [Validators.required, Validators.email]),
      role: new FormControl ('',  [Validators.required]),
      status:new FormControl ('',  Validators.required),
    });
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
  toggleRoleDropdown() {
    this.roleOpen = !this.roleOpen;
  }

  toggleStatusDropdown() {
    this.statusOpen = !this.statusOpen;
  }

   // Get paginated users
   getPaginatedUsers(users: User[] | null): User[] {
    if (!users) {
      return []; // Return an empty array if users is null or undefined
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return users.slice(startIndex, endIndex);
  }
  

  // Handle page change
  onPageChange(page: number): void {
    this.currentPage = page;
  }
  get totalPages(): number {
    return Math.ceil((this.totalItems || 1) / this.itemsPerPage);
  }
  
}
