import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../Service/auth.service';
import { DialogService } from '../Service/dialog.service';


@Component({
  selector: 'header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  private dialogService = inject(DialogService);
  private theme = { color: '#ff7043' };
  isNotHomePage = false;  
  user: any = null;
  isLoading = false;

  constructor(private router: Router) {}

  logout() {
    this.authService.logout();
  }

  navigateIfAuthenticated(role: string, path: string) {
    this.isLoading = true;

    if (this.user?.role === role) {
      const formattedPath = `/app-layout/${role.toLowerCase().replace(/\s+/g, '-')}`;
      this.router.navigate([formattedPath]);
    } else {
      this.dialogService
        .showDialog(`You must be a ${role} to access this`, 'Access Denied')
        .subscribe((confirmed) => {
          if (confirmed) {
            this.router.navigate(['auth/sign-up']); 
          }
          this.isLoading = false; 
        });
    }
  }
}
