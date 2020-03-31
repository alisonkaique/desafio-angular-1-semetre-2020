import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TaskService } from '../task/task.service';
import { Task } from '../task/task';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { formatDate } from '@angular/common';
import { PoDialogService } from '@portinari/portinari-ui';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html'
})
export class TaskDetailsComponent implements OnInit {

    task$: Observable<Task>;
    taskId: number;
    taskDescription: string;
    taskCreateDate: string;
    taskDeadline: string;
    taskStatus: string;

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService,
        private poDialog: PoDialogService
    ) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.taskId = this.route.snapshot.params.taskId;
            this.task$ = this.taskService.findById(this.taskId);

            this.task$
                .subscribe(
                    (task) => {
                        this.taskStatus = (task.status == 1 ? 'Aberta' : 'Concluída');
                        // verifica se está vencida
                        const actualDate = new Date();

                        this.taskStatus = formatDate(actualDate, 'yyyy-MM-dd', 'en-US') > formatDate(task.deadLine, 'yyyy-MM-dd', 'en-US')
                            ? 'Vencida'
                            : this.taskStatus;

                        this.taskDescription = task.description;
                        this.taskCreateDate = formatDate(task.createDate, 'dd/MM/yyyy', 'en-US');
                        this.taskDeadline = formatDate(task.deadLine, 'dd/MM/yyyy', 'en-US');
                    },
                    err => { this.router.navigate(['not-found']); });
          });
    }

    finish() {
        this.poDialog.confirm({
            title: 'Conclusão de Tarefa',
            message: 'Confirma a conclusão da Tarefa?',
            confirm: () => (this.finishTask()),
            cancel: () => (console.log('clicou em cancelar'))
        });
    }

    edit() {
        this.poDialog.confirm({
            title: 'Alteração de Tarefa',
            message: 'Confirma a alteração da Tarefa?',
            confirm: () => (this.editTask()),
            cancel: () => (console.log('clicou em cancelar'))
        });
    }

    editTask() {
        this.router.navigate(['t', 'add'], { queryParams: { taskId: this.taskId, isEdit: true }});
    }

    finishTask() {
        this.taskService
            .finishTask(this.taskId)
                .subscribe(
                    () => {
                        this.alertService.success('Tarefa Concluída com Sucesso', true);
                        this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true });
                    },
                    (err) => {
                        console.log(err);
                        this.alertService.warning('Não foi possível concluir a Tarefa');
                    }
                );
    }

    remove() {
        this.poDialog.confirm({
            title: 'Exclusão de Tarefa',
            message: 'Confirma a Exclusão?',
            confirm: () => (this.removeTask()),
            cancel: () => (console.log('clicou em cancelar'))
        });
    }

    removeTask() {
        this.taskService
            .removeTask(this.taskId)
            .subscribe(
                () => {
                    this.alertService.success('Tarefa Excluida com Sucesso', true);
                    this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true });
                },
                err => {
                    console.log(err);
                    this.alertService.warning('Não foi possível excluir a Tarefa');
                }
            );
    }

}
