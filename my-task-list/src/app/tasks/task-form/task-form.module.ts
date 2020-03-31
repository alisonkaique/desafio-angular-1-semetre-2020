import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TaskFormComponent } from './task-form.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { TaskModule } from '../task/task.module';
import { PoFieldModule, PoButtonModule, PoTagModule } from '@portinari/portinari-ui';

@NgModule({
    declarations: [
        TaskFormComponent
    ]
    , imports: [
        CommonModule,
        ReactiveFormsModule,
        VMessageModule,
        FormsModule,
        RouterModule,
        TaskModule,
        PoFieldModule,
        PoButtonModule,
        PoTagModule
    ]
})
export class TaskFormModule {

}