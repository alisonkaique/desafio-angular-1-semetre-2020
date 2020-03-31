import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TaskService } from '../task/task.service';
import { Task } from '../task/task';

@Injectable({ providedIn: 'root' })
export class TaskListResolver implements Resolve<Observable<Task[]>> {

    constructor(private service: TaskService) { }

    // Resolver os dados antes do componente da rota ser criado
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
        const userName = route.params.userName;

        return this.service.listFromUserPaginated(userName, 1);
    }
}