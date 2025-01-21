import { Component, inject } from '@angular/core';
import { Router,NavigationEnd} from '@angular/router';
import { TuiLink } from '@taiga-ui/core';
import { AuthmodRoutingModule } from '../../authmod/authmod-routing.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'header',
  imports: [TuiLink, AuthmodRoutingModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  route: Router = inject(Router);
  navigate(){
    this.route.navigate(["/auth"])
  }
  
  isHomeRoute: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events to determine the active route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomeRoute = this.router.url === '/home-page'; // Adjust '/home-page' to match your home route
      }
    });
  }

  // navigate(): void {
  //   // Add your navigation logic here
  //   console.log('Navigation triggered');
  // }
}
