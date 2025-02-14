import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiLink } from '@taiga-ui/core';
import { AuthmodRoutingModule } from '../authmod/authmod-routing.module';
import { NgIf } from '@angular/common';
import { AuthService } from '../Service/auth.service';
import { DialogService } from '../Service/dialog.service'; 
import { take } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'header',
  imports: [TuiLink, AuthmodRoutingModule, NgIf, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  private dialogService: DialogService = inject(DialogService); 
  isNotHomePage: boolean = false;
  user: any = null;
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      console.log('User updated in HeaderComponent:', user); // Debug log
      this.user = user; // Update the user state
    });
  }
  
  logout() {
    this.authService.logout();
  }

 
  navigateIfAuthenticated(role: string, path: string) {
    this.isLoading = true;
    if (!this.user || this.user.role !== role) {
      console.log('User role does not match or user is not logged in, showing dialog');
      this.dialogService
        .showDialog(
          `You must be logged in as a ${role} to access this`,
          'Access Denied'
        )
        .pipe(take(1)) 
        .subscribe((confirmed) => {
          if (confirmed) {
            this.router.navigate(['auth/sign-up']);
          }
          this.isLoading = false;
        });
      return;
    }
  
    // If the user's role matches, navigate to the desired route
    const formattedPath = `/app-layout/${role.toLowerCase().replace(/\s+/g, '-')}`;
    this.router.navigate([formattedPath]);
    this.isLoading = false;
  }

}