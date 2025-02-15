import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../Modal/authResponse';
import { BehaviorSubject, catchError, throwError, switchMap, Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<{ email: string, role: string } | null>(null);
  user$ = this.userSubject.asObservable(); // Expose observable for tracking user state
  private firestore = inject(Firestore);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string, role: string): 
  Observable<{ email: string; localId: string; role: string }> {
    const data = { email, password, returnSecureToken: true };
  
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
        data
      )
      .pipe(
        switchMap((response: AuthResponse) => {
          if (!response.localId) {
            throw new Error('Signup failed, no user ID returned.');
          }
  
          // ✅ Store user data in Firestore
          const userDocRef = doc(this.firestore, 'users', response.localId);
          return from(setDoc(userDocRef, { email, role })).pipe(
            switchMap(() => {
              return from([{ email, localId: response.localId, role }]);
            })
          );
        }),
        catchError(this.handleErrorMessage)
      );
  }

  login(email: string, password: string): 
  Observable<{ email: string; localId: string; role: string; idToken: string }> {
    const data = { email, password, returnSecureToken: true };
  
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
        data
      )
      .pipe(
        switchMap((response: AuthResponse) => {
          if (!response.localId) {
            return throwError(() => new Error('Login failed, no user ID returned.'));
          }
  
          const userDocRef = doc(this.firestore, 'users', response.localId);
          return from(getDoc(userDocRef)).pipe(
            switchMap((userDoc) => {
              if (!userDoc.exists()) {
                return throwError(() => new Error('User role not found.'));
              }
  
              const userData = userDoc.data() as { role?: string };
              const role = userData?.role || 'unknown';
  
              return from([{ email, localId: response.localId, role, idToken: response.idToken }]);
            })
          );
        }),
        catchError(this.handleErrorMessage)
      );
  }
  

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
    // Navigate and refresh
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
