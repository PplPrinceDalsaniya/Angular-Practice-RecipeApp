import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private http: HttpClient){}

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
            })
        );
    }
}