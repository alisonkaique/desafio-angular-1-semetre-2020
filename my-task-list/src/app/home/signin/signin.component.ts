import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PoPageLogin } from '@portinari/portinari-templates';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    contactEmail: string;
    login: string;
    loginPattern: string;
    loginError: string;
    loginErrors: Array<string>;
    passwordError: string;
    passwordErrors: Array<string>;
    passwordPattern: string;
    recovery: string;
    registerUrl: string;
    exceededAttempts: number;
    logo: string;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.restore();
    }

    addLoginError() {
        this.loginErrors.push(this.loginError);
        this.loginError = '';
    }

    addPasswordError() {
        this.passwordErrors.push(this.passwordError);
        this.passwordError = '';
    }

    loginSubmit(formData: PoPageLogin) {

        if (this.exceededAttempts <= 0) {
            this.authService
                .authenticate(formData.login, formData.password, formData.rememberUser)
                .subscribe(
                    (response) => {
                        const body = response.body;
                        const userName = body['name'];

                        this.router.navigate(['user', userName]); // sucesso
                    },
                    (err) => {
                        console.log(err.message);
                    }
                );
        }
    }

    restore() {
        this.contactEmail = 'alisonkaique@gmail.com';
        this.exceededAttempts = 0;
        this.login = '';
        this.loginPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
        this.loginError = '';
        this.loginErrors = [];
        this.logo = './assets/img/home.png';
        this.passwordError = '';
        this.passwordErrors = [];
        this.passwordPattern = '';
        this.passwordError = '';
        this.passwordErrors = [];
        this.recovery = '';
        this.registerUrl = '/home/signup';
    }
}
