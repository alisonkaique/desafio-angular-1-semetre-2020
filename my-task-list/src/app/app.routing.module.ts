import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthGuard } from './core/auth/auth.guard';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskListResolver } from './tasks/task-list/task-list.resolver';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryListResolver } from './categories/category-list/category-list.resolver';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'user/:userName',
        component: TaskListComponent,
        canActivate: [AuthGuard],
        resolve: {
            tasks: TaskListResolver
        },
        data: {
            title: 'Lista de Tarefas'
        }
    },
    {
        path: 'categories',
        component: CategoryListComponent,
        canActivate: [AuthGuard],
        resolve: {
            categories: CategoryListResolver
        },
        data: {
            title: 'Lista de Categorias'
        }
    },
    {
        path: 't/add',
        component: TaskFormComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Cadastro de Tarefas'
        }
    },
    {
        path: 't/:taskId',
        component: TaskDetailsComponent,
        data: {
            title: 'Detalhe da Tarefa'
        }
    },
    {
        path: 'c/add',
        component: CategoryFormComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Cadastro de Categorias'
        }
    },
    {
        path: 'c/:categoryId',
        component: CategoryDetailsComponent,
        data: {
            title: 'Detalhe da Categoria'
        }
    },
    {
        path: 'error',
        component: GlobalErrorComponent,
        data: {
            title: 'Error'
        }
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        data: {
            title: 'Not found'
        }
    },
    {
        path: '**',
        redirectTo: 'not-found'
    } // qualquer outra rota diferente das acima, acessará essa genérica
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}