import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../Modal/authResponse';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);

  signUp(email: string, password: string){

    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return  this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
      data
    ).pipe(catchError(this.handleErrorMessage))
  }
  login(email:string, password: string){
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
      data
    )
    .pipe(catchError(this.handleErrorMessage))
  }

  forgotPassword(email: string, requestType: string){
    const data = {requestType: requestType, email: email}

    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
      data
    ).pipe(catchError(this.handleErrorMessage))
  }

  resetPassword(oobCode:string, newPassword: string ){
    const data = {oobCode: oobCode, newPassword: newPassword}

    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyA_TwU_V8GXFh0mMJBh8D5mmlc8zqQE_1o',
      data
    ).pipe(catchError(this.handleErrorMessage))
  }

  private handleErrorMessage(err){
    let errorMessage = "Something went wrong";

    if(!err.error || !err.error.error){
        return throwError(() => errorMessage)
    }
    switch(err.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email alredy exist';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'This operation is not allowed';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid email or password';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier';
        break ;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator';
        break;
      case 'EXPIRED_OOB_CODE':
          errorMessage = 'The action code has expired';
          break
      case 'INVALID_OOB_CODE':
          errorMessage = 'The action code is invalid';
          break 
    }
    return throwError(() => errorMessage)
  }
}
