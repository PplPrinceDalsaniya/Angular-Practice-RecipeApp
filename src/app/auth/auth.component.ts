import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component ({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoggedIn: boolean = false;
    isLoading: boolean = false;
    error: string = null;

    constructor ( private authService: AuthService){}

    onSwithMode() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) return;

        const email = form.value.email;
        const password = form.value.password;
        
        this.isLoading = true;
        if (this.isLoggedIn) {
            
        } else {
            this.authService.signUp(email, password).subscribe(
                resData => {
                    console.log(resData);
                    this.isLoading = false;
                },
                errorMsg => {
                    console.log(errorMsg);
                    this.error = errorMsg;
                    this.isLoading = false;
                }
            );
        }

        form.reset();
    }
}