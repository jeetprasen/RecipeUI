import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.modal";
import { Router } from "@angular/router";
import { ServiceConstants } from "../shared/service-constants";

export interface AuthResponseData {
    userId: string,
    email: string,
    expiresIn: number,
    token: string
}
export interface CreateResponseData {
    userId: string
    firstName: string,
    lastName: string,
    email: string,
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private serviceConstants: ServiceConstants,
        private router: Router) { }

    logout() {        
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expiratonDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => this.logout(), expiratonDuration);
    }

    login(email: string, password: string) {
        const postData = { email: email, password: password };
        let headers = new HttpHeaders({ Accept: 'application/json', ChangeOrigin: 'true' });
        return this.http.post<AuthResponseData>(this.serviceConstants.login, postData,
            {
                headers: headers
            }).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.userId, resData.email, resData.token, +resData.expiresIn);
            }));
    }

    signUp(firstname: string, lastname: string, email: string, password: string) {
        const postData = { firstName: firstname, lastName: lastname, email: email, password: password };
        let headers = new HttpHeaders({ Accept: 'application/json'/* , Authorization: 'Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNjIxMjY2NzQxfQ.K1zfpCRYJH1xkl48dt1BPBT8hXj4Ad4lwG3kxozpi7BCwK02AeEGxNOdYY2nUnYuSIplyGqCaTyEUP7VJ1zOKA'  */});
        return this.http.post<CreateResponseData>(this.serviceConstants.createuser, postData,
            {
                headers: headers
            }).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occured!"
        switch (errorRes.status) {
            case 403:
                errorMessage = "Incorrect Credentials";
                break;
            case 500:
                errorMessage = "Email Already Exists";
                break;
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(id: string, email: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn);
        const user = new User(id, email, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin() {
        const userData: {
            email: string;
            userId: string;
            _token: string;
            expiresIn: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) return;

        const loadedUser = new User(userData.userId, userData.email, userData._token, new Date(userData.expiresIn));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData.expiresIn).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }
}