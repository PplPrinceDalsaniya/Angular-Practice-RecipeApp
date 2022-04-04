import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(
        private http: HttpClient,
        private router: Router
    ){}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCM-6RoM3JzmqC2xqiEGc1jodgP4jRMgMw", 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(errorRes => {
                let errorMsg = "An unknown error occured!";
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMsg);
                }
                switch (errorRes.error.error.message) {
                    case "EMAIL_EXISTS":
                        errorMsg = "The email address is already in use by another account.";
                        break;
                    case "OPERATION_NOT_ALLOWED": 
                        errorMsg = "Password sign-in is disabled for this project.";
                        break;
                    case "TOO_MANY_ATTEMPTS_TRY_LATER":
                        errorMsg = "We have blocked all requests from this device due to unusual activity. Try again later.";
                        break;
                }
                return throwError(errorMsg);
            }),

            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCM-6RoM3JzmqC2xqiEGc1jodgP4jRMgMw", {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(errorRes => {
                let errorMsg = "An unknown error occured!";
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMsg);
                }
                switch (errorRes.error.error.message) {
                    case "EMAIL_NOT_FOUND":
                        errorMsg = "There is no user record corresponding to this identifier. The user may have been deleted.";
                        break;
                    case "INVALID_PASSWORD":
                        errorMsg = "The password is invalid or the user does not have a password.";
                        break;
                    case "USER_DISABLED":
                        errorMsg = "The user account has been disabled by an administrator.";
                        break;
                }
                return throwError(errorMsg);
            }),

            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication (email: string, userID: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userID, token, expirationDate);
        this.user.next(user);
    }
}