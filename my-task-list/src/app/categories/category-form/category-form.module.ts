import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CategoryFormComponent } from './category-form.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { CategoryModule } from '../category/category.module';
import { PoFieldModule, PoButtonModule, PoTagModule } from '@portinari/portinari-ui';

@NgModule({
    declarations: [
        CategoryFormComponent
    ]
    , imports: [
        CommonModule,
        ReactiveFormsModule,
        VMessageModule,
        FormsModule,
        RouterModule,
        CategoryModule,
        PoFieldModule,
        PoButtonModule,
        PoTagModule
    ]
})
export class CategoryFormModule {

}