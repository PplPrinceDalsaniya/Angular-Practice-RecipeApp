import { Component, ComponentFactoryResolver } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { AuthResponseData, AuthService } from "./auth.service";

@Component ({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoggedIn: boolean = false;
    isLoading: boolean = false;
    error: string = null;

    constructor ( 
        private authService: AuthService,
        private router: Router,
        private cpr: ComponentFactoryResolver
    ){}

    onSwithMode() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) return;

        const email = form.value.email;
        const password = form.value.password;
        
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoggedIn) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes'])
            },
            errorMsg => {
                console.log(errorMsg);
                this.error = errorMsg;
                this.showErrorAlert(errorMsg);
                this.isLoading = false;
            }
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    showErrorAlert(errorMessage: string) {
        const alertComponentFactory = this.cpr.resolveComponentFactory(AlertComponent);
        
    }
}