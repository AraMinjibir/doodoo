import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiLink } from '@taiga-ui/core';
import { AuthmodRoutingModule } from '../authmod/authmod-routing.module';
import { NgIf } from '@angular/common';
import { AuthService } from '../Service/auth.service';
import { DialogService } from '../Service/dialog.service'; // 👈 Import DialogService

@Component({
  selector: 'header',
  imports: [TuiLink, AuthmodRoutingModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  private dialogService: DialogService = inject(DialogService); // 👈 Inject DialogService
  isNotHomePage: boolean = false;
  user: any = null;
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  
  logout() {
    this.authService.logout();
  }

  navigateIfAuthenticated(role: string, path: string) {
    this.isLoading = true;
  
    if (!this.user) { // 👈 Ensure user is required
      this.router.navigate(['auth/sign-up']);
      this.isLoading = false;
      return;
    }
  
    if (this.user.role === role) {
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