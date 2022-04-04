import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component ({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoggedIn: boolean = false;

    onSwithMode() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        form.reset();
    }
}