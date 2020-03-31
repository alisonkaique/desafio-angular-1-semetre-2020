import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TaskDetailsComponent } from './task-details.component';
import { TaskModule } from '../task/task.module';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { TaskOwnerOnlyDirective } from './task-owner-only/task-owner-only.directive';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';
import { PoToolbarModule, PoFieldModule, PoWidgetModule } from '@portinari/portinari-ui';

@NgModule({
    declarations: [
        TaskDetailsComponent,
        TaskOwnerOnlyDirective
    ],
    exports: [
        TaskDetailsComponent
    ],
    imports: [
        CommonModule,
        TaskModule,
        RouterModule,
        ReactiveFormsModule,
        VMessageModule,
        ShowIfLoggedModule,
        PoFieldModule,
        PoWidgetModule,
        FormsModule
    ]
})

export class TaskDetailsModule {

}
