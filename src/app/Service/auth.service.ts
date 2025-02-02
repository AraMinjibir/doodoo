import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../Modal/authResponse';
import { BehaviorSubject, catchError, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<{ email: string, role: string } | null>(null);
  user$ = this.userSubject.asObservable(); // Expose observable for tracking user state

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.userSubject.next(storedUser);
    }
  }

  signUp(email: string, password: string) {
    const data = { email, password, returnSecureToken: true };
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
      data
    ).pipe(
      catchError(this.handleErrorMessage)
    );
  }

  login(email: string, password: string) {
    const data = { email, password, returnSecureToken: true };
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
      data
    ).pipe(
      tap(response => {
        const user = { email: response.email, role: 'Sender' }; 
        this.setUser(user);
      }),
      catchError(this.handleErrorMessage)
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null); // Reset user state
    console.log("User logged out, clearing storage.");
    this.router.navigate(['/app-layout/home-page']).then(() => {
      window.location.reload(); 
    });
  }

  forgotPassword(email: string, requestType: string) {
    const data = { requestType: "PASSWORD_RESET", email };
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
      data
    ).pipe(catchError(this.handleErrorMessage));
  }

  resetPassword(oobCode: string, newPassword: string) {
    const data = { oobCode, newPassword };
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
      data
    ).pipe(catchError(this.handleErrorMessage));
  }

  getStoredUser(): { email: string, role: string } | null {
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

  setUser(user: { email: string, role: string }) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  private handleErrorMessage(err: any) {
    let errorMessage = "Something went wrong";
    if (!err.error || !err.error.error) return throwError(() => errorMessage);

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS': errorMessage = 'This email already exists'; break;
      case 'OPERATION_NOT_ALLOWED': errorMessage = 'This operation is not allowed'; break;
      case 'INVALID_LOGIN_CREDENTIALS': errorMessage = 'Invalid email or password'; break;
      case 'EMAIL_NOT_FOUND': errorMessage = 'No user record found for this email'; break;
      case 'USER_DISABLED': errorMessage = 'This account has been disabled'; break;
      case 'EXPIRED_OOB_CODE': errorMessage = 'The action code has expired'; break;
      case 'INVALID_OOB_CODE': errorMessage = 'The action code is invalid'; break;
    }

    return throwError(() => errorMessage);
  }
}
