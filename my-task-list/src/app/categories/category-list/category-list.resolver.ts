import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CategoryService } from '../category/category.service';
import { Category } from '../category/category';
import { UserService } from 'src/app/core/user/user.service';

@Injectable({ providedIn: 'root' })
export class CategoryListResolver implements Resolve<Observable<Category[]>> {

    constructor(
        private userService: UserService,
        private service: CategoryService
        ) { }

    // Resolver os dados antes do componente da rota ser criado
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        const userName = this.userService.getUserName();

        return this.service.listFromUserPaginated(userName, 1);
    }
}