import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
        });
    }
}