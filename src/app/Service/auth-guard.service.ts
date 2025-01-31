import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const storedUser = this.getStoredUser();
    
    if (!storedUser) {
      this.router.navigate(['/auth/sign-up']);
      return false;
    }

    const { email, role } = storedUser;
    const requiredRole = route.data['role'];

    if (role !== requiredRole) {
      console.warn(`Access denied. Expected role: ${requiredRole}, but found: ${role}`);
      this.router.navigate(['/app-layout/home-page']); 
      return false;
    }

    return true;
  }

  private getStoredUser(): { email: string, role: string } | null {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (Array.isArray(storedUser) && storedUser.length >= 2) {
        return { email: storedUser[0], role: storedUser[1] };
      }
      return storedUser;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  }
}
