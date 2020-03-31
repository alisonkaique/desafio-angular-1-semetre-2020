import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowIfLoggedDirective } from './show-if-logger.directive';

@NgModule({
    declarations: [
        ShowIfLoggedDirective
    ],
    exports: [
        ShowIfLoggedDirective
    ],
    imports: [
        CommonModule
    ]
})
export class ShowIfLoggedModule {

}
