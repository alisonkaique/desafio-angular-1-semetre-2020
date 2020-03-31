import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryDetailsComponent } from './category-details.component';
import { CategoryModule } from '../category/category.module';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { CategoryOwnerOnlyDirective } from './category-owner-only/category-owner-only.directive';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';
import { PoToolbarModule, PoTagModule, PoWidgetModule } from '@portinari/portinari-ui';

@NgModule({
    declarations: [
        CategoryDetailsComponent,
        CategoryOwnerOnlyDirective
    ],
    exports: [
        CategoryDetailsComponent
    ],
    imports: [
        CommonModule,
        CategoryModule,
        RouterModule,
        ReactiveFormsModule,
        VMessageModule,
        ShowIfLoggedModule,
        PoWidgetModule,
        PoTagModule
    ]
})

export class CategoryDetailsModule {

}
