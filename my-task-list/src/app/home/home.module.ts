import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignInComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignUpService } from './signup/signup.service';

import { PoPageLoginModule, PoModalPasswordRecoveryModule } from '@portinari/portinari-templates';
import { PoFieldModule, PoButtonModule } from '@portinari/portinari-ui';

@NgModule({
    declarations: [
        HomeComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule,
        PoPageLoginModule,
        PoModalPasswordRecoveryModule,
        PoFieldModule,
        PoButtonModule
    ],
    providers: [
        SignUpService
    ]
})
export class HomeModule {

}