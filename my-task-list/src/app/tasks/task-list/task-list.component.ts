import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../task/task';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  filter = '';
  hasMore = true;
  currentPage = 1;
  userName = '';

  // Injeção de Dependência
  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
    ) {  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        this.userName = params.userName;
        this.tasks = this.activatedRoute.snapshot.data['tasks'];
      });
  }

  load() {
    this.taskService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(tasks => {
        this.filter = '';
        this.tasks = this.tasks.concat(tasks);

        if (!tasks.length) { this.hasMore = false; }
      });
  }
}
