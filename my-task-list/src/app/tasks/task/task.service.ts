import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Task } from './task';
import { environment } from 'src/environments/environment';
import { CategoryService } from 'src/app/categories/category/category.service';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
    ) { }

  // Busca completa
  listFromUser(userName: string) {
    return this.http
      .get<Task[]>(API + '/' + userName + '/tasks'); // efetuando requisição GET para o endpoint
  }

  // Busca paginada
  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString() );

    return this.http
      .get<Task[]>(API + '/' + userName + '/tasks', { params }); // efetuando requisição GET para o endpoint
  }

  listFromCategoryPaginated(categoryId: number, page: number) {
    const params = new HttpParams().append('page', page.toString() );

    return this.http
      .get<Task[]>(API + '/tasks/category/' + categoryId, { params }); // efetuando requisição GET para o endpoint
  }

  upload(task: Task) {
    return this.http.post(
      API + '/tasks/upload',
      task,
      {
        observe: 'events',
        reportProgress: true
      }
      );
  }

  edit(taskId: number, task: Task) {
    return this.http.post(
      API + '/tasks/edit/' + taskId,
      task,
      {
        observe: 'events',
        reportProgress: true,
      }
      );
  }

  findById(taskId: number) {
    return this.http.get<Task>(API + '/tasks/' + taskId);
  }

  finishTask(taskId: number) {
    return this.http.post(API + '/tasks/finish/' + taskId, {});
  }

  removeTask(taskId: number) {
    return this.http.delete(API + '/tasks/' + taskId);
  }
}
