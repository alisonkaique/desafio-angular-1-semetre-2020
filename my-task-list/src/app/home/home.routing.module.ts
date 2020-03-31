import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginGuard } from '../core/auth/login.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: '',
                component: SignInComponent,
                data: {
                    title: 'Bem-vindo'
                }
            },
            {
                path: 'signup',
                component: SignUpComponent,
                data: {
                    title: 'Novo Registro'
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes) // quando é um arquivo de rotas que depende que um "pai", deve-se definir o método forChild
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}