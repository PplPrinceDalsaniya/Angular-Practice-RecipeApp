import { Component } from "@angular/core";

@Component ({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoggedIn: boolean = false;

    onSwithMode() {
        this.isLoggedIn = !this.isLoggedIn;
    }
}