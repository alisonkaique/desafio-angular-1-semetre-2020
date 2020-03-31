import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable()
export class SignUpService {

    constructor(private http: HttpClient) {

    }

    checkUserNameTaken(userName: string) {
        return this.http.get(API + '/user/exists/' + userName);
    }

    checkEmailTaken(email: string) {
        return this.http.get(API + '/email/exists/' + email);
    }

    signUp(newUser: NewUser) {
        return this.http.post(API + '/user/signup', newUser);
    }
}
