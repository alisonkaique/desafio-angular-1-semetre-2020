import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoadButtonComponent } from '../categories-list/load-button/load-button.component';
import { FilterByDescription } from './filter-by-description.pipe';
import { CategoryModule } from '../category/category.module';
import { CategoryCardModule } from 'src/app/shared/components/category-card/category-card.module';
import { CategorySearchComponent } from './search/category-search.component';
import { DarkenOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darken-on-hover.module';
import { PoFieldModule, PoToolbarModule } from '@portinari/portinari-ui';
import { CategoryFooterComponent } from '../category-footer/category-footer.component';

@NgModule({
    declarations: [
        CategoryListComponent,
        CategoriesComponent,
        LoadButtonComponent,
        FilterByDescription,
        CategorySearchComponent,
        CategoryFooterComponent
    ]
    , imports: [
        CommonModule,
        CategoryModule,
        CategoryCardModule,
        CategoryModule,
        DarkenOnHoverModule,
        RouterModule,
        PoFieldModule,
        PoToolbarModule
    ]
 })
export class CategoryListModule {

}
