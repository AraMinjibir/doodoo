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
  route: Router = inject(Router);
  // navigate(){
  //   this.route.navigate(["/auth"])
  // }
  
  isNotHomePage: boolean = false;  // New flag to track if we are NOT on home page

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // If the current URL is not the home page URL, show the Home link
      this.isNotHomePage = event.urlAfterRedirects !== '/home-page';
    });
  }
}
