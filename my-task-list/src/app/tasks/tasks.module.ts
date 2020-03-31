import { NgModule } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TaskModule } from './task/task.module';
import { TaskListModule } from './task-list/task-list.module';
import { TaskFormModule } from './task-form/task-form.module';
import { DarkenOnHoverModule } from '../shared/directives/darken-on-hover/darken-on-hover.module';
import { TaskDetailsModule } from './task-details/task-details.module';

@NgModule({
  imports: [
    TaskModule,
    TaskListModule,
    TaskFormModule,
    DarkenOnHoverModule,
    TaskDetailsModule
  ],
  exports: [ TaskComponent ],
})
export class TasksModule { }
