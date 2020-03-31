import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task/task.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { finalize } from 'rxjs/operators';
import { PoSelectOption } from '@portinari/portinari-ui';
import { CategoryService } from 'src/app/categories/category/category.service';
import { Task } from '../task/task';
import { taskDeadLineValidator } from './task-deadline.validator';

const API_URL = 'http://localhost:3000'

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  option: PoSelectOption;
  options: Array<PoSelectOption> = [];
  category: number;
  isEdit: false;
  taskId: number;
  task: Task;
  pageTitle = 'Nova Tarefa';

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  private clickCancel() {
    this.router.navigate(['']);
  }

  ngOnInit() {

    this.route
      .queryParams
        .subscribe(
          (params) => {
            if (params) {
              this.isEdit = params.isEdit;
              this.taskId = params.taskId;

              if (this.isEdit && this.taskId) {
                this.pageTitle = 'Atualizar Tarefa';

                this.taskService
                  .findById(this.taskId)
                    .subscribe(
                      async (task) => {
                        this.task = task;

                        if (this.options.length > 0) {
                          console.log('true');
                        } else {
                          console.log('false');
                        }

                        await this.addOptions();

                        console.log(this.options);

                        this.category = this.task.categoryId;

                        console.log(this.category);

                        await this.taskFormBuilder();
                      },
                      (err) => {
                        console.log(err);
                        this.router.navigate(['', 'not-found']);
                      }
                    );
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );

    if (!this.isEdit) {

      this.addOptions();

      this.taskFormBuilder();
    }
  }

  taskFormBuilder() {

    if (this.isEdit && this.task) {
      this.option = { label: this.task.category, value: this.task.categoryId};

      this.category = this.task.categoryId;
    }

    this.taskForm = this.formBuilder.group({
      title: [
        this.isEdit ? this.task.title : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],
      description: [
        this.isEdit ? this.task.description : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(300)
        ]
      ],
      deadLine: [
        this.isEdit ? new Date(this.task.deadLine) : new Date(),
        [
          Validators.required
        ]
      ],
      category: [
        this.isEdit ? this.category : '',
        [
          Validators.required
        ]
      ]
    },
    {
        validator: taskDeadLineValidator // validação crossfield
    });
  }

  addOptions() {

    const userName = this.userService.getUserName();

    this.options = [];

    this.categoryService
      .listFromUser(userName)
        .subscribe(
          async (categories) => {
            categories.map(category => {
              this.option = {label: category.description, value: category.id};
              this.options.push(this.option);
            }
            );
          },
          (err) => {
            console.log(err);
          }
        );
  }

  changeCategory() {
    console.log(this.category);
  }

  upload() {
    const newTask = this.taskForm.getRawValue() as Task;
    const localDate = new Date(newTask.deadLine);
    const localTime = localDate.getTime();
    const localOffset = localDate.getTimezoneOffset() * 60000;
    const newDeadline = new Date(localTime + localOffset);

    newTask.status = 1;
    newTask.deadLine = newDeadline;

    console.log(newTask);

    if (!this.isEdit) {
      this.taskService
      .upload(newTask)
      .pipe(finalize(() => {
        this.router.navigate(['/user', this.userService.getUserName()]);
      }))
      .subscribe((event: HttpEvent<any>) => {
        if (event.type == HttpEventType.Response) {
          this.alertService.success('Tarefa Cadastrada com Sucesso ', true);
        }
      },
      err => {
        console.log(err);
        this.alertService.danger('Não foi possível cadastrar a Tarefa', true);
      });
    } else {
      this.taskService
      .edit(this.taskId, newTask)
      .pipe(finalize(() => {
        this.router.navigate(['/user', this.userService.getUserName()]);
      }))
      .subscribe((event: HttpEvent<any>) => {
        if (event.type == HttpEventType.Response) {
          this.alertService.success('Tarefa Alterada com Sucesso ', true);
        }
      },
      err => {
        console.log(err);
        this.alertService.danger('Não foi possível alterada a Tarefa', true);
      });
    }
  }

}
