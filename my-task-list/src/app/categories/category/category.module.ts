import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryComponent } from './category.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        CategoryComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        CategoryComponent
    ]
})

export class CategoryModule {

}
