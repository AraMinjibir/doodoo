import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  
    console.log("Stored User:", storedUser);
  
    let user;
    if (Array.isArray(storedUser)) {
      user = { email: storedUser[0], role: storedUser[1] };
    } else {
      user = storedUser;
    }
  
    console.log("Extracted Role:", user?.role);
  
    if (!user || !user.role) {
      this.router.navigate(['/sign-up']);
      return false;
    }
  
    const requiredRole = route.data['role'];
    console.log("Required Role:", requiredRole);
  
    if (user.role !== requiredRole) {
      alert(`Access denied, You need to be ${requiredRole} to view this page`);
      return false;
    }
  
    return true;
  }
  

}
