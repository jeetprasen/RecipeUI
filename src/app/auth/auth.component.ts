import { Component, OnInit } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        
    }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const firstname = form.value.firstname;
        const lastname = form.value.lastname;
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<any>;

        this.isLoading = true;
        if (this.isLoginMode === true) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signUp(firstname, lastname, email, password);            
        }
        
        authObs.subscribe(
            (data) => {
                this.isLoading = false;
                this.error = null;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }
}