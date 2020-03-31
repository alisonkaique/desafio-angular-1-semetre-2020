import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

  authenticate(userName: string, password: string, rememberUser: boolean) {
    return this.http
      .post(API + '/user/login', {userName, password}, { observe: 'response' })
      .pipe(tap(res => {
        /*
        if (rememberUser) {
          const authToken = res.headers.get('x-access-token'); // token de autenticação
          this.userService.setToken(authToken); // gravando no navegador
        }
        */

       const authToken = res.headers.get('x-access-token'); // token de autenticação
       this.userService.setToken(authToken, rememberUser); // gravando no navegador
      }));
  }
}
