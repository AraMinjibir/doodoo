import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  isHomeRoute: boolean = false;

  constructor(private router: Router){
    this.router.events.subscribe(() => {
      this.isHomeRoute = this.router.url === "home-page"
    })
  }
}
