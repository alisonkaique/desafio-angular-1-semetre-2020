import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { SignUpService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {
    constructor(private signUpService: SignUpService) {

    }

    checkUserNameToken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName => {
                    return this.signUpService.checkUserNameTaken(userName);
                }))
                .pipe(map(isTaken => {
                    return isTaken ? { userNameTaken: true} : null;
                }))
                .pipe(first());
        }
    }

    checkEmailToken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(email => {
                    return this.signUpService.checkEmailTaken(email);
                }))
                .pipe(map(isTaken => {
                    return isTaken ? { userNameTaken: true} : null;
                }))
                .pipe(first());
        }
    }
}
