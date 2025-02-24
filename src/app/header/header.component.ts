import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TuiLink } from '@taiga-ui/core';
import { AuthmodRoutingModule } from '../authmod/authmod-routing.module';
import { NgIf } from '@angular/common';
import { AuthService } from '../Service/auth.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'header',
  imports: [TuiLink, AuthmodRoutingModule, NgIf, MatDialogModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService); 
  user: any = null;
  isLoading: boolean = false;
  

  constructor(private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      console.log('User updated in HeaderComponent:', user); 
      this.user = user; // Update the user state
    });
  }
  
  logout() {
    this.authService.logout();
  }

 
  navigateIfAuthenticated(role: string, path: string) {
    this.isLoading = true;
  
    if (!this.user) {
      this.isLoading = false;
      return;
    }
   
    const formattedPath = `/app-layout/${role.toLowerCase().replace(/\s+/g, '-')}`;
    this.router.navigate([formattedPath]);
    this.isLoading = false;
  }
  
  
  
  

}