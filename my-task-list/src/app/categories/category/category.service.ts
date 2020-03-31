import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Category } from './category';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // Busca completa
  listFromUser(userName: string) {
    return this.http
      .get<Category[]>(API + '/' + userName + '/categories'); // efetuando requisição GET para o endpoint
  }

  // Busca paginada
  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString() );

    return this.http
      .get<Category[]>(API + '/' + userName + '/categories', { params }); // efetuando requisição GET para o endpoint
  }

  upload(
    category: Category
  ) {
    return this.http.post(
      API + '/categories/upload',
      category,
      {
        observe: 'events',
        reportProgress: true
      }
      );
  }

  findById(categoryId: number) {
    return this.http.get<Category>(API + '/categories/' + categoryId);
  }

  checkCategoryTaken(description: string) {
    return this.http.get(API + '/category/exists/' + description);
  }

  removeCategory(categoryId: number) {
    return this.http.delete(API + '/categories/' + categoryId);
  }
}
