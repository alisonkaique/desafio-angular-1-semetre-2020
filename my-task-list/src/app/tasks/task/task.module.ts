import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskComponent } from './task.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        TaskComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        TaskComponent
    ]
})
export class TaskModule {

}
