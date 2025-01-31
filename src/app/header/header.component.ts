import { Component, inject } from '@angular/core';
import { Router,NavigationEnd} from '@angular/router';
import { TuiLink } from '@taiga-ui/core';
import { AuthmodRoutingModule } from '../authmod/authmod-routing.module';
import { NgIf } from '@angular/common';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'header',
  imports: [TuiLink, AuthmodRoutingModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  isNotHomePage: boolean = false;  
  user: any = null;
  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    console.log("Stored User in Header:", storedUser);
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("Extracted Role:", Array.isArray(user) ? user[1] : user?.role);
    } else {
      console.log("No user found in storage");
    }
  }
  
  

  logout() {
    this.authService.logout();
  }

  navigateIfAuthenticated(role: string, path: string) {
      
    if (this.user?.role === role) {
      const formattedPath = `/app-layout/${role.toLowerCase().replace(/\s+/g, '-')}`;
      console.log("Navigating to:", formattedPath);
      this.router.navigate([formattedPath]);
    } else {
      alert(`You must be a ${role} to access this`);
      this.router.navigate(['auth/sign-up']); // Redirect to sign-in page
    }
  }
  
  
  

}
