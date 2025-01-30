import { Component, inject } from '@angular/core';
import { Router,NavigationEnd} from '@angular/router';
import { TuiLink } from '@taiga-ui/core';
import { AuthmodRoutingModule } from '../authmod/authmod-routing.module';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'header',
  imports: [TuiLink, AuthmodRoutingModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  isNotHomePage: boolean = false;  // New flag to track if we are NOT on home page
  user: any = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // If the current URL is not the home page URL, show the Home link
      this.isNotHomePage = event.urlAfterRedirects !== '/home-page';
    });
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    console.log("Stored User:", storedUser);
    
    if (Array.isArray(storedUser)) {
      this.user = { email: storedUser[0], role: storedUser[1] };
    } else {
      this.user = storedUser;
    }
  
    console.log("Extracted Role:", this.user?.role);
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
  
  
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['app-layout/home-page'])
  }

}
