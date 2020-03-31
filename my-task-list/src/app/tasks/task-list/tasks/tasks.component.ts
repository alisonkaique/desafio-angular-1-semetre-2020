import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Task } from '../../task/task';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnChanges {

  // inbound property
  @Input() tasks: Task[] = [];
  rows = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tasks) {
      this.rows = this.groupColumns(this.tasks);
    }
  }

  groupColumns(tasks: Task[]): any[] {
    const newRows = [];

    for (let index = 0; index < tasks.length; index += 3) {
      newRows.push(tasks.slice(index, index + 3));
    }

    return newRows;
  }

  getStatus(status: number, deadLine: Date) {
    const actualDate = new Date();

    let statusText = (status == 1 ? 'Aberta' : 'Concluída');

    // verifica se está vencida
    statusText = formatDate(actualDate, 'yyyy-MM-dd', 'en-US') > formatDate(deadLine, 'yyyy-MM-dd', 'en-US') ? 'Vencida' : statusText;

    return statusText;
  }
}
