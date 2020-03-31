import { NgModule } from '@angular/core';

import { CategoryComponent } from './category/category.component';
import { CategoryModule } from './category/category.module';
import { CategoryListModule } from './category-list/category-list.module';
import { CategoryFormModule } from './category-form/category-form.module';
import { DarkenOnHoverModule } from '../shared/directives/darken-on-hover/darken-on-hover.module';
import { CategoryDetailsModule } from './category-details/category-details.module';

@NgModule({
  imports: [
    CategoryModule,
    CategoryListModule,
    CategoryFormModule,
    DarkenOnHoverModule,
    CategoryDetailsModule
  ],
  exports: [ CategoryComponent ],
})
export class CategoriesModule { }
