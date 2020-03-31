import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TaskListComponent } from './task-list.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoadButtonComponent } from '../tasks-list/load-button/load-button.component';
import { FilterByDescription } from './filter-by-description.pipe';
import { TaskModule } from '../task/task.module';
import { TaskCardModule } from 'src/app/shared/components/task-card/task-card.module';
import { SearchComponent } from './search/search.component';
import { DarkenOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darken-on-hover.module';
import { PoFieldModule, PoToolbarModule } from '@portinari/portinari-ui';
import { CategoryModule } from 'src/app/categories/category/category.module';
import { FormsModule } from '@angular/forms';
import { TaskFooterComponent } from '../task-footer/task-footer.component';

@NgModule({
    declarations: [
        TaskListComponent,
        TasksComponent,
        TaskFooterComponent,
        LoadButtonComponent,
        FilterByDescription,
        SearchComponent
    ]
    , imports: [
        CommonModule,
        TaskModule,
        TaskCardModule,
        CategoryModule,
        DarkenOnHoverModule,
        RouterModule,
        PoFieldModule,
        FormsModule,
        PoToolbarModule
    ]
 })
export class TaskListModule {

}
