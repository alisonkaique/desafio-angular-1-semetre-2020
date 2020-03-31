import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { userNamePassword } from './username-password.validator';
import { PoDialogService } from '@portinari/portinari-ui';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit{

    signUpForm: FormGroup;
    @ViewChild('emailInput', null) emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private poDialog: PoDialogService,
        private formBuilder: FormBuilder,
        private userNotTakenService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router
    ) {

    }

    private clickCancel() {
        this.router.navigate(['']);
    }

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ],
                this.userNotTakenService.checkEmailToken() // validadores assíncronos
            ],
            userName: ['', // valor inicial padrão
                [ // validadores síncronos
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenService.checkUserNameToken() // validadores assíncronos
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ],
        },
        {
            validator: userNamePassword // validação crossfield
        });
    }

    signUp() {
        if (this.signUpForm.valid && !this.signUpForm.pending) {
            const newUser = this.signUpForm.getRawValue() as NewUser; // retorna um objeto com todos os inputs do formulário

            this.signUpService
                .signUp(newUser) // Criando usuário
                .subscribe(
                    () => {
                        this.poDialog.alert({
                            title: 'Novo Registro',
                            message: 'Criado com sucesso para o e-mail: ' + newUser.email
                        });

                        this.router.navigate(['']);
                    },
                    err => console.log(err));
        }
    }
}
